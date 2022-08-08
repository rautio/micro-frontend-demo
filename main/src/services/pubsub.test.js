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
});
