import "./index.css";
import { Composition } from "remotion";
import { ModelViews } from "./ModelViews";
import { Gates } from "./Gates";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="ModelViews-en" component={ModelViews} defaultProps={{ lang: "en" as const }} durationInFrames={250} fps={30} width={1280} height={720} />
      <Composition id="ModelViews-es" component={ModelViews} defaultProps={{ lang: "es" as const }} durationInFrames={250} fps={30} width={1280} height={720} />
      <Composition id="Gates-en" component={Gates} defaultProps={{ lang: "en" as const }} durationInFrames={290} fps={30} width={1280} height={720} />
      <Composition id="Gates-es" component={Gates} defaultProps={{ lang: "es" as const }} durationInFrames={290} fps={30} width={1280} height={720} />
    </>
  );
};
