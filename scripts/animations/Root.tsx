import "./index.css";
import { Composition } from "remotion";
import { ModelViews } from "./ModelViews";
import { Gates } from "./Gates";
import { Carpeta, DURATION } from "./Carpeta";

const carpetaIds = ["transfer", "states", "register", "upload"] as const;

export const RemotionRoot: React.FC = () => {
  return (
    <>
      <Composition id="ModelViews-en" component={ModelViews} defaultProps={{ lang: "en" as const }} durationInFrames={250} fps={30} width={1280} height={720} />
      <Composition id="ModelViews-es" component={ModelViews} defaultProps={{ lang: "es" as const }} durationInFrames={250} fps={30} width={1280} height={720} />
      <Composition id="Gates-en" component={Gates} defaultProps={{ lang: "en" as const }} durationInFrames={290} fps={30} width={1280} height={720} />
      <Composition id="Gates-es" component={Gates} defaultProps={{ lang: "es" as const }} durationInFrames={290} fps={30} width={1280} height={720} />
      {carpetaIds.flatMap((id) =>
        (["en", "es"] as const).map((lang) => (
          <Composition key={`${id}-${lang}`} id={`Carpeta-${id}-${lang}`} component={Carpeta} defaultProps={{ id, lang }} durationInFrames={DURATION} fps={30} width={1280} height={720} />
        )),
      )}
    </>
  );
};
