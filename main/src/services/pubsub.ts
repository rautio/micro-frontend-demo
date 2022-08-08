// @ts-ignore
import { v4 as uuid, validate as validateUUID } from "uuid";

type Topic = string;
type Message = Record<string, unknown>;
type ID = string;
type OnMessageFn = (message: Message) => void;

// TOOD: What to do if someone subscribers to a topic after messages have been published? Do we queue them?

export class PubSub {
  // Keep track of all onMessage listeners with easy lookup by subscriptio id
  private subscriberOnMsg: Record<ID, OnMessageFn> = {};
  // Keep track of the topic for each subscription id for easier cleanup
  private subscriberTopics: Record<ID, Topic> = {};
  // Keep track of all topics and subscriber ids for each topic
  private topics: Record<Topic, ID[]> = {};

  /**
   * Subscribe to messages being published in the given topic.
   * @param topic Name of the channel/topic where messages are published.
   * @param onMessage Function called whenever new messages on the topic are published.
   * @returns ID of this subscription.
   */
  public subscribe(topic: Topic, onMessage: OnMessageFn): ID {
    // Validate inputs
    if (typeof topic !== "string") throw new Error("Topic must be a string.");
    if (typeof onMessage !== "function")
      throw new Error("onMessage must be a function.");
    // Each subscription has a unique id
    const subID = uuid();
    if (!(topic in this.topics)) {
      // New topic
      this.topics[topic] = [subID];
    } else {
      // Topic exists
      this.topics[topic].push(subID);
    }
    // Store onMessage and topic separately for faster lookup
    this.subscriberOnMsg[subID] = onMessage;
    this.subscriberTopics[subID] = topic;
    return subID;
  }

  /**
   * Unsusbscribe for a given subscription id.
   * @param id Subscription id
   */
  public unsuscribe(id: ID): void {
    // Validate inputs
    if (typeof id !== "string" || !validateUUID(id)) {
      throw new Error("ID must be a valid UUID.");
    }
    // If the id exists in our subscriptions then clear it.
    if (id in this.subscriberOnMsg && id in this.subscriberTopics) {
      // Delete message listener
      delete this.subscriberOnMsg[id];
      // Remove id from the topics tracker
      const topic = this.subscriberTopics[id];
      // Cleanup topics
      if (topic && topic in this.topics) {
        const idx = this.topics[topic].findIndex((tID) => tID === id);
        if (idx > -1) {
          this.topics[topic].splice(idx, 1);
        }
        // If there are no more listeners clean up the topic as well
        if (this.topics[topic].length === 0) {
          delete this.topics[topic];
        }
      }
      // Delete the topic for this id
      delete this.subscriberTopics[id];
    }
  }

  /**
   * Publish messages on a topic for all subscribers to receive.
   * @param topic The topic where the message is sent.
   * @param message The message to send. Only object format is supported.
   */
  public publish(topic: Topic, message: Record<string, unknown>) {
    if (typeof topic !== "string") throw new Error("Topic must be a string.");
    if (typeof message !== "object") {
      throw new Error("Message must be an object.");
    }
    // If topic exists post messages
    if (topic in this.topics) {
      const subIDs = this.topics[topic];
      subIDs.forEach((id) => {
        if (id in this.subscriberOnMsg) {
          this.subscriberOnMsg[id](message);
        }
      });
    }
  }
}

export default PubSub;
