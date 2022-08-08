import PubSub from "./pubsub";

describe("PubSub should", () => {
  test("subscribe and publish messages", () => {
    const ps = new PubSub();
    const onMessage = jest.fn();
    ps.subscribe("foo", onMessage);
    const message = { foo: "bar" };
    ps.publish("foo", message);
    expect(onMessage).toHaveBeenCalledWith(message);
  });
  test("throw error if subscribe topic is not string", () => {
    const ps = new PubSub();
    expect(() => ps.subscribe({ not: "string" }, () => {})).toThrow(
      "Topic must be a string."
    );
  });
  test("throw error if subscribe onMessage is not a function", () => {
    const ps = new PubSub();
    expect(() => ps.subscribe("myTopic", "not function")).toThrow(
      "onMessage must be a function."
    );
  });
  test("throw error when persistedTopics is not an array", () => {
    expect(() => new PubSub({ persistedTopics: { foo: "bar" } })).toThrow(
      "Persisted topics must be an array of topics."
    );
  });
  test("unsubscribe and not receive any more messages", () => {
    const ps = new PubSub();
    const onMessage = jest.fn();
    const subID = ps.subscribe("foo", onMessage);
    const message = { foo: "bar" };
    ps.publish("foo", message);
    ps.unsuscribe(subID);
    ps.publish("foo", message);
    expect(onMessage).toHaveBeenCalledTimes(1);
  });
  test("store messages for a persisted topic and send them for new subscribers", () => {
    const ps = new PubSub({ persistedTopics: ["foo"] });
    const onMessage = jest.fn();
    const message = { foo: "bar" };
    ps.publish("foo", message);
    ps.publish("foo", message);
    ps.publish("foo", message);
    ps.subscribe("foo", onMessage);
    expect(onMessage).toHaveBeenCalledWith(message);
    expect(onMessage).toHaveBeenCalledTimes(3);
  });
});
