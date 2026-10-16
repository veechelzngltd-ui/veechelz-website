import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("png");

Config.OutputLocation = (comp) => {
  return `out/${comp.id}.mp4`;
};