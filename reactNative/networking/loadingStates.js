class LoadingState {
  // Create new instances of the same class as static attributes
  static idle = new LoadingState("idle");

  static loading = new LoadingState("loading");

  static succeeded = new LoadingState("succeeded");

  static failed = new LoadingState("failed");

  constructor(name) {
    this.name = name;
  }
}
