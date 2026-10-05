---
title: Reaching a resource in AWS doesn't mean you're allowed to use it
date: 2026-10-04
summary: Same instance, same role, same network, three S3 calls and two different answers, and the experiment only proves anything if you rule out the network first.
tags: cloud, architecture
---

Most of the AWS problems I see described as "S3 doesn't work from my instance" are two different problems wearing the same error. One is reachability: is there a route, does DNS resolve, does a security group let the packet through. The other is authorization: is this identity allowed to do this action on this resource. They fail in different places, they're fixed in different consoles, and treating one as the other burns an afternoon.

I ran a small experiment for my cloud computing course to pull the two apart. The setup is boring on purpose.

## One identity, one network, two answers

One private S3 bucket with two objects, `allowed/context.txt` and `restricted/secret.txt`. One EC2 instance in a public subnet, with an IAM role attached and no access keys anywhere on the box. The role carries exactly one policy:

```json
{
  "Effect": "Allow",
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::dcl-s05-team01-ACCOUNT/allowed/*"
}
```

No `s3:*`, no `Resource: "*"`, not even `ListBucket`. From the instance I ran three calls. `GetObject` on `allowed/context.txt` returned the file. `GetObject` on `restricted/secret.txt` returned `AccessDenied`. `PutObject` into `allowed/` returned `AccessDenied` too.

Same machine, same role, same route, same second. The only things that changed between the three calls were the `Action` and the `Resource`, which are the only two things the policy talks about. One call failed on the resource and the other on the action.

## Prove who is calling before you read the answer

An `Allow` or a `Deny` means nothing until you know which identity got it. The first command on the instance wasn't an S3 call:

```sh
aws configure list                  # keys show type iam-role, nothing typed by hand
aws sts get-caller-identity         # arn:aws:sts::...:assumed-role/dcl-dev-role-s05/i-...
```

If a stray access key had been sitting in `~/.aws/credentials`, every result after that would describe some other user's permissions. The role session in the ARN is the evidence that the experiment tests the policy I wrote.

## Rule out everything else, or the denial proves nothing

The part people skip is the control. An `AccessDenied` is only evidence of authorization if nothing else could have produced a failure.

So the restricted object existed before the test, because asking for a missing key gives you a 404 or a 403 depending on what you're allowed to list, and that is a different question from the one I was asking. The account started from a clean baseline, with no leftover gateways or route tables from earlier labs. And the allowed `GetObject` succeeding is the network control: it proves the route, the DNS and the security group all work. Every packet path the denied calls needed, the allowed call had just used.

That's what makes it an experiment rather than a demo. A demo shows the denial. An experiment shows that the denial could only have come from one place.

## Each control answers a different question

The lab adds two more controls and it's worth being precise about what each one does not do.

The objects are encrypted at rest with SSE-S3, which `put-object` confirms with `"ServerSideEncryption": "AES256"`. That protects the disk. It does nothing about a role that's allowed to read, since S3 decrypts transparently for anyone authorized. Encryption is not access control, and a bucket with encryption on and `s3:*` in a policy is wide open.

CloudTrail answers "who changed this". The `AttachRolePolicy` call that gave the role its permission shows up in Event history with the caller and the time. It doesn't prevent anything. It's how you find out, after the fact, who widened a policy.

So the role says who, the policy says what and on which resource, encryption covers the disk and CloudTrail records who changed what. Four controls, and none of them can stand in for another.

## The objection: a private subnet is security enough

The strongest pushback I hear is that if the instance can't reach the internet, the IAM detail is academic. I don't buy it. A VPC endpoint or a NAT puts S3 back within reach in one route-table change, and S3 is reachable from anywhere by design. Network controls decide who can knock. They know nothing about which object you asked for. The day someone adds a gateway endpoint for an unrelated reason, the policy is the only thing still saying no.

In the architecture brief I'm writing for the same course, the app tier gets a role with this shape and no keys, and the database sits behind a security group that only accepts the app's security group. Those are two different walls for two different attacks. Neither one is the backup for the other.

Next time `AccessDenied` shows up, check who is calling before you go looking at the route table.
