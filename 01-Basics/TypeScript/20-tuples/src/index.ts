// ENUMs
enum DataItemCategory {
  VOICE,
  VIDEO,
  PICTURE,
  PERSON,
  ANIMAL,
  COLORS,
  PROPERTY,
}

// Generics with Interfaces
interface DataItem<T> {
  uid: string;
  category: DataItemCategory;
  available: boolean;
  data: T;
}

const dataItem1: DataItem<object> = {
  uid: "XXXBBB123",
  category: DataItemCategory.PERSON,
  available: true,
  data: { name: "Ali", age: 24 },
};

const dataItem2: DataItem<string> = {
  uid: "ABTTRBB123",
  category: DataItemCategory.VOICE,
  available: false,
  data: "singing.mp3",
};

const dataItem3: DataItem<string[]> = {
  uid: "TTRREQWD22",
  category: DataItemCategory.COLORS,
  available: false,
  data: ["red", "green", "blue"],
};
