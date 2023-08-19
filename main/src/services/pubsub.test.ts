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

  test("unsubscribe and not receive any more messages", () => {
    const ps = new PubSub();
    const onMessage = jest.fn();
    const subID = ps.subscribe("foo", onMessage);
    const message = { foo: "bar" };
    ps.publish("foo", message);
    ps.unsubscribe(subID);
    ps.publish("foo", message);
    expect(onMessage).toHaveBeenCalledTimes(1);
  });
  
  test("store messages for a persisted topic and send them for new subscribers", () => {
    const ps = new PubSub({ persistedTopics: ["foo"] });
    const onMessage = jest.fn();
    const message = { foo: "bar" };
    ps.publish("foo", { other: "not bar" });
    ps.publish("foo", { alsoNotBar: "foo" });
    // Persists only the last message
    ps.publish("foo", message);
    ps.subscribe("foo", onMessage);
    expect(onMessage).toHaveBeenCalledWith(message);
    // Only called once with the latest message
    expect(onMessage).toHaveBeenCalledTimes(1);
  });
});
