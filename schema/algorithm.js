var algorithm = {
    "id": "/Algorithm",
    "type": "object",
    "additionalProperties": false,
    "properties": {
        "name": {
            "type": "string",
            "required": true
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
            "type": "string",
            "required": true
        },
        "longDescription": {
            "type": "string"
        },
        "links": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "url": {
                        "required": true
                    },
                    "name": {
                        "required": true
                    },
                    "picture": {
                        "required": false
                    }
                }
            }
        }
    }
};

module.exports = algorithm;