exports.definition = {
	config: {
		columns: {
		    "thingId": "INTEGER PRIMARY KEY AUTOINCREMENT",
		    "item": "text",
		    "dateAdded": "text"
		},
		adapter: {
			idAttribute: "thingId",
			type: "sql",
			collection_name: "things"
		}
	},
	extendModel: function(Model) {
		_.extend(Model.prototype, {
			// extended functions and properties go here
		});

		return Model;
	},
	extendCollection: function(Collection) {
		_.extend(Collection.prototype, {
			// extended functions and properties go here
		});

		return Collection;
	}
};