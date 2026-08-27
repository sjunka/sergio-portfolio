import "./index.css";
import { Composition } from "remotion";
import { ModelViews } from "./ModelViews";

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="ModelViews-en" component={ModelViews} defaultProps={{ lang: "en" as const }} durationInFrames={250} fps={30} width={1280} height={720} />
      <Composition id="ModelViews-es" component={ModelViews} defaultProps={{ lang: "es" as const }} durationInFrames={250} fps={30} width={1280} height={720} />
    </>
  );
};
