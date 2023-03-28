import { Ros, Topic } from "roslib";

type InitiateRosType = () => Ros;
type initiateTopicType = (config: {
  ros: Ros;
  name: string;
  messageType: string;
}) => Topic;

export const initiateRos: InitiateRosType = () => {
  const ros = new Ros({
    url: "ws://localhost:9090",
  });

  ros.on("connection", (event) => {
    console.log("Connected")
  });
  ros.on("error", () => {});
  ros.on("close", () => {});

  return ros;
};

export const initiateTopic: initiateTopicType = (config) => {
  const topic = new Topic({ ...config });
  return topic;
};
