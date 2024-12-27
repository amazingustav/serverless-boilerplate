import type { Environment } from "vitest";

export default <Environment>{
  name: "test",
  setup() {
    return {
      teardown() {
        // called after all tests with this env have been run
      },
    };
  },
};
