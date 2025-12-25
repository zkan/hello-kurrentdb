# Hello, KurrentDB!

Run the KurrentDB:

```bash
mise run up
```

Append a new event:

```bash
node append.js
```

Read all events:

```bash
node read.js
```

Append to and read from a stream:

```bash
node app.js
```

Then access the endpoint here:
[http://localhost:8080/hello-world?visitor=Ouro](http://localhost:8080/hello-world?visitor=Ouro)

Tear down the KurrentDB:

```bash
mise run down
```

## References

* [KurrentDB NodeJS
Client](https://github.com/kurrent-io/KurrentDB-Client-NodeJS)
* [EventStoreDB-From-Scratch-Nodejs](https://github.com/kurrent-io/EventStoreDB-From-Scratch-Nodejs)
* [Node.js Sample: Hello,
World!](https://github.com/kurrent-io/samples/tree/main/Quickstart/Nodejs/esdb-sample-nodejs)
* [How to Setup Node.js and
TypeScript](https://www.youtube.com/watch?v=u_GQSEjis48)
* [TSX vs ts-node: The Definitive TypeScript Runtime Comparison
](https://betterstack.com/community/guides/scaling-nodejs/tsx-vs-ts-node/)
