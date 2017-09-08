var algorithm = {
    "name": {
        "type": "string"
    },
    "longName": {
        "type": "string"
    },
    "tags": {
        "type": "array",
        "uniqueItems": true,
        "items": {
            "type": "string"
        }
    },
    "description": {
        "type": "string"
    },
    "longDescription": {
        "type": "string"
    },
    "links": {
        "type": "array",
        "uniqueItems": true,
        "items": {
            "type": "string"
        }
    }
};

module.exports = algorithm;