/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3208698804")

  // update collection data
  unmarshal({
    "listRule": "created_by = @request.auth.id"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3208698804")

  // update collection data
  unmarshal({
    "listRule": null
  }, collection)

  return app.save(collection)
})
