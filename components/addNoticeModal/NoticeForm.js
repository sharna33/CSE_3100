import {
  Input,
  Textarea,
  DatePicker,
  Button,
  Select,
  SelectItem,
} from "@nextui-org/react";
import { useState } from "react";
import { now, getLocalTimeZone } from "@internationalized/date";

export default function NoticeForm({
  onSubmit,
  fields,
  setMessage,
  courses,
  departments,
  notice_creator,
  notice_creator_name,
}) {
  const [errors, setErrors] = useState({});

  const handleValidation = (event) => {
    const { name, value } = event.target;
    let error = "";

    if (name !== "notice_creator_name") {
      if (!value) {
        error = "This field is required";
      } else if (name === "email" && !/\S+@\S+\.\S+/.test(value)) {
        error = "Please enter a valid email";
      } else if (name === "course_id" && isNaN(value)) {
        error = "Please enter a valid course ID";
      } else if (name === "department" && isNaN(value)) {
        error = "Please enter a valid department number";
      }
    }

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: error,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formErrors = {};

    fields.forEach((field) => {
      if (field.name !== "notice_creator_name") {
        const value = formData.get(field.name);
        if (!value) {
          formErrors[field.name] = "This field is required";
        }
      }
    });

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      onSubmit(event, setMessage);
    }
  };

  const renderSelectOptions = (fieldName) => {
    if (fieldName === "course_id") {
      return courses.map((course) => (
        <SelectItem key={course.course_id} value={course.course_id}>
          {`${course.course_code} - ${course.course_name}`}
        </SelectItem>
      ));
    } else if (fieldName === "department") {
      return departments.map((department) => (
        <SelectItem
          key={department.department_id}
          value={department.department_id}
        >
          {department.dept_short_name}
        </SelectItem>
      ));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {fields.map((field) => (
        <div key={field.name}>
          {field.type === "textarea" ? (
            <Textarea
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              label={field.label}
              variant="bordered"
              radius="sm"
              className="mb-4"
              onBlur={handleValidation}
              isInvalid={!!errors[field.name]}
              errorMessage={errors[field.name]}
              css={{ color: "red" }}
            />
          ) : field.type === "date" ? (
            <DatePicker
              name={field.name}
              placeholder={field.placeholder}
              required={field.required}
              label={field.label}
              hideTimeZone
              showMonthAndYearPickers
              defaultValue={now(getLocalTimeZone())}
              variant="bordered"
              radius="sm"
              className="mb-4"
              isInvalid={!!errors[field.name]}
              errorMessage={errors[field.name] || "Please enter a valid date"}
              css={{ color: "red" }}
            />
          ) : field.type === "select" ? (
            <Select
              name={field.name}
              required={field.required}
              label={field.label}
              variant="bordered"
              radius="sm"
              className="mb-4"
              onBlur={handleValidation}
              isInvalid={!!errors[field.name]}
              errorMessage={errors[field.name]}
              css={{ color: "red" }}
            >
              {renderSelectOptions(field.name)}
            </Select>
          ) : (
            <Input
              name={field.name}
              type={field.type}
              placeholder={field.placeholder}
              required={field.required}
              label={field.label}
              variant="bordered"
              radius="sm"
              className="mb-4"
              onBlur={handleValidation}
              isInvalid={!!errors[field.name]}
              errorMessage={errors[field.name]}
              css={{ color: "red" }}
              value={
                field.name === "notice_creator"
                  ? notice_creator_name
                  : undefined
              }
              readOnly={
                field.name === "notice_creator" ||
                field.name === "notice_creator_name"
              }
            />
          )}
        </div>
      ))}
      <div className="flex justify-end mt-2">
        <Button type="submit" radius="sm" variant="flat" color="warning">
          Submit
        </Button>
      </div>
    </form>
  );
}
