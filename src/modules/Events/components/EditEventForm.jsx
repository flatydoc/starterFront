import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { InputNumber } from "primereact/inputnumber";
import classNames from "classnames";

export const EditEventForm = ({
  control,
  handleSubmit,
  onSubmit,
  getFormErrorMessage,
  errors,
}) => {
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="title"
          control={control}
          rules={{ required: "Header is required." }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Header</label>
              </span>
              {getFormErrorMessage(field.name)}
            </>
          )}
        />
        <Controller
          name="text"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Text</label>
              </span>
            </>
          )}
        />
        <Controller
          name="date"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <Calendar
                  inputId={field.name}
                  value={field.value}
                  onChange={field.onChange}
                  dateFormat="dd/mm/yy"
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                <label htmlFor={field.name}>Date</label>
              </span>
            </>
          )}
        />
        <Controller
          name="place"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Place</label>
              </span>
            </>
          )}
        />
        <Controller
          name="price"
          control={control}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}
              ></label>
              <span className="p-float-label">
                <InputNumber
                  id={field.name}
                  inputRef={field.ref}
                  value={field.value}
                  onBlur={field.onBlur}
                  onValueChange={(e) => field.onChange(e)}
                  useGrouping={false}
                  inputClassName={classNames({ "p-invalid": fieldState.error })}
                />
                <label htmlFor={field.name}>Price</label>
              </span>
            </>
          )}
        />
        <button type="submit">Edit</button>
      </form>
    </>
  );
};
