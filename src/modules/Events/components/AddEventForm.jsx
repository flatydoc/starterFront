import { Controller } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Calendar } from "primereact/calendar";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { Mention } from "primereact/mention";
import classNames from "classnames";

export const AddEventForm = ({
  control,
  handleSubmit,
  onSubmit,
  getFormErrorMessage,
  errors,
  onSearch,
  suggestions,
  itemTemplate,
  categories,
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
                className={classNames({ "p-error": errors.value })}></label>
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
          rules={{ required: "Text is required." }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Text</label>
              </span>
              {getFormErrorMessage(field.name)}
            </>
          )}
        />
        {/* <Controller
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
          name="time"
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
                  timeOnly
                  onChange={field.onChange}
                  className={classNames({ "p-invalid": fieldState.error })}
                />
                <label htmlFor={field.name}>Time</label>
              </span>
            </>
          )}
        /> */}
        <Controller
          name="place"
          control={control}
          rules={{ required: "Place is required." }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}></label>
              <span className="p-float-label">
                <InputText
                  id={field.name}
                  value={field.value}
                  className={classNames({ "p-invalid": fieldState.error })}
                  onChange={(e) => field.onChange(e.target.value)}
                />
                <label htmlFor={field.name}>Place</label>
              </span>
              {getFormErrorMessage(field.name)}
            </>
          )}
        />
        <Controller
          name="price"
          control={control}
          rules={{ required: "Price is required." }}
          render={({ field, fieldState }) => (
            <>
              <label
                htmlFor={field.name}
                className={classNames({ "p-error": errors.value })}></label>
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
              {getFormErrorMessage(field.name)}
            </>
          )}
        />
        <Controller
          name="artists"
          control={control}
          render={({ field, fieldState }) => (
            <span className="p-float-label">
              <Mention
                id={field.name}
                field="nickname"
                {...field}
                rows={5}
                cols={40}
                className={classNames({ "p-invalid": fieldState.error })}
                suggestions={suggestions}
                onSearch={onSearch}
                placeholder="Please enter @ to mention artists"
                itemTemplate={itemTemplate}
              />
              <label htmlFor={field.name}>add artists</label>
            </span>
          )}
        />
        <Controller
          name="category"
          control={control}
          render={({ field, fieldState }) => (
            <span className="p-float-label">
              <Dropdown
                id={field.name}
                value={field.value}
                optionLabel="name"
                placeholder="Select a category"
                options={categories}
                showClear
                focusInputRef={field.ref}
                onChange={(e) => field.onChange(e.value)}
                className={classNames({ "p-invalid": fieldState.error })}
              />
              <label htmlFor={field.name}>Add to category</label>
            </span>
          )}
        />
        <button type="submit">Add new</button>
      </form>
    </>
  );
};
