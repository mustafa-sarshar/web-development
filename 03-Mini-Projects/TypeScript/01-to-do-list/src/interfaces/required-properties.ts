interface HasTaskName {
  taskName: string;
}

interface HasTaskDeadline {
  taskDeadline: Date;
}

interface HasTaskCategory {
  taskCategory: string;
}

export { HasTaskName, HasTaskDeadline, HasTaskCategory };
