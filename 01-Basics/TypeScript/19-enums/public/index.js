"use strict";
// ENUMs
var DataItemCategory;
(function (DataItemCategory) {
    DataItemCategory[DataItemCategory["VOICE"] = 0] = "VOICE";
    DataItemCategory[DataItemCategory["VIDEO"] = 1] = "VIDEO";
    DataItemCategory[DataItemCategory["PICTURE"] = 2] = "PICTURE";
    DataItemCategory[DataItemCategory["PERSON"] = 3] = "PERSON";
    DataItemCategory[DataItemCategory["ANIMAL"] = 4] = "ANIMAL";
    DataItemCategory[DataItemCategory["COLORS"] = 5] = "COLORS";
    DataItemCategory[DataItemCategory["PROPERTY"] = 6] = "PROPERTY";
})(DataItemCategory || (DataItemCategory = {}));
const dataItem1 = {
    uid: "XXXBBB123",
    category: DataItemCategory.PERSON,
    available: true,
    data: { name: "Ali", age: 24 },
};
const dataItem2 = {
    uid: "ABTTRBB123",
    category: DataItemCategory.VOICE,
    available: false,
    data: "singing.mp3",
};
const dataItem3 = {
    uid: "TTRREQWD22",
    category: DataItemCategory.COLORS,
    available: false,
    data: ["red", "green", "blue"],
};
