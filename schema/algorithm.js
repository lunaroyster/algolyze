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
            "type": "string",
            "required": true
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
    }
};

module.exports = algorithm;