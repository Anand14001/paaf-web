"use client";

import type { ReactNode } from "react";
import { useId } from "react";
import { Icon, cx } from "@/components/ui";
import { COUNTRY_OPTIONS } from "@/lib/countries";

/* Shared form field primitives.

   Every field wires label → control → error through real ids and
   aria-describedby, so a screen reader announces the error with the
   field rather than leaving it stranded elsewhere on the page. */

type BaseProps = {
  label: string;
  name: string;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
};

function FieldShell({
  label,
  name,
  error,
  hint,
  required,
  children,
  controlId,
  errorId,
  hintId,
}: BaseProps & {
  children: ReactNode;
  controlId: string;
  errorId: string;
  hintId: string;
}) {
  return (
    <div>
      <label htmlFor={controlId} className="field-label">
        {label}
        {required ? (
          <span aria-hidden className="ml-1 text-terracotta">
            *
          </span>
        ) : (
          <span className="ml-1.5 font-normal text-muted">(optional)</span>
        )}
      </label>
      {children}
      {hint && !error && (
        <p id={hintId} className="field-hint">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="field-error" role="alert">
          <Icon name="alert" size={15} className="mt-px shrink-0" />
          <span>{error}</span>
        </p>
      )}
      <input type="hidden" name={`${name}__meta`} />
    </div>
  );
}

export function TextField({
  type = "text",
  placeholder,
  autoComplete,
  defaultValue,
  value,
  onChange,
  ...base
}: BaseProps & {
  type?: "text" | "email" | "tel" | "number";
  placeholder?: string;
  autoComplete?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const uid = useId();
  const controlId = `${base.name}-${uid}`;
  const errorId = `${controlId}-error`;
  const hintId = `${controlId}-hint`;

  return (
    <FieldShell {...base} controlId={controlId} errorId={errorId} hintId={hintId}>
      <input
        id={controlId}
        name={base.name}
        type={type}
        placeholder={placeholder}
        autoComplete={autoComplete}
        defaultValue={defaultValue}
        value={value}
        disabled={base.disabled}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        aria-invalid={base.error ? "true" : undefined}
        aria-describedby={base.error ? errorId : base.hint ? hintId : undefined}
        aria-required={base.required}
        className="field-input"
      />
    </FieldShell>
  );
}

export function TextAreaField({
  placeholder,
  rows = 4,
  maxLength,
  value,
  onChange,
  ...base
}: BaseProps & {
  placeholder?: string;
  rows?: number;
  maxLength?: number;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const uid = useId();
  const controlId = `${base.name}-${uid}`;
  const errorId = `${controlId}-error`;
  const hintId = `${controlId}-hint`;

  return (
    <FieldShell {...base} controlId={controlId} errorId={errorId} hintId={hintId}>
      <textarea
        id={controlId}
        name={base.name}
        rows={rows}
        maxLength={maxLength}
        placeholder={placeholder}
        value={value}
        disabled={base.disabled}
        onChange={onChange ? (e) => onChange(e.target.value) : undefined}
        aria-invalid={base.error ? "true" : undefined}
        aria-describedby={base.error ? errorId : base.hint ? hintId : undefined}
        className="field-input resize-y"
      />
    </FieldShell>
  );
}

export function SelectField({
  options,
  groups,
  placeholder,
  value,
  onChange,
  ...base
}: BaseProps & {
  options?: { value: string; label: string }[];
  groups?: { group: string; options: string[] }[];
  placeholder?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  const uid = useId();
  const controlId = `${base.name}-${uid}`;
  const errorId = `${controlId}-error`;
  const hintId = `${controlId}-hint`;

  return (
    <FieldShell {...base} controlId={controlId} errorId={errorId} hintId={hintId}>
      <div className="relative">
        <select
          id={controlId}
          name={base.name}
          value={value}
          disabled={base.disabled}
          onChange={onChange ? (e) => onChange(e.target.value) : undefined}
          aria-invalid={base.error ? "true" : undefined}
          aria-describedby={base.error ? errorId : base.hint ? hintId : undefined}
          aria-required={base.required}
          className="field-input appearance-none pr-11"
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options?.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
          {groups?.map((g) => (
            <optgroup key={g.group} label={g.group}>
              {g.options.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </optgroup>
          ))}
        </select>
        <Icon
          name="chevron-down"
          size={18}
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-muted"
        />
      </div>
    </FieldShell>
  );
}

export function CountryField(props: Omit<BaseProps, "name"> & {
  name?: string;
  value?: string;
  onChange?: (v: string) => void;
}) {
  return (
    <SelectField
      {...props}
      name={props.name ?? "country"}
      groups={COUNTRY_OPTIONS}
      placeholder="Select your country"
    />
  );
}

export function CheckboxField({
  label,
  name,
  error,
  checked,
  onChange,
  disabled,
}: {
  label: ReactNode;
  name: string;
  error?: string;
  checked?: boolean;
  onChange?: (v: boolean) => void;
  disabled?: boolean;
}) {
  const uid = useId();
  const controlId = `${name}-${uid}`;
  const errorId = `${controlId}-error`;

  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={controlId}
          name={name}
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={onChange ? (e) => onChange(e.target.checked) : undefined}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className={cx(
            "mt-0.5 h-5 w-5 shrink-0 cursor-pointer rounded-[5px] border-2 accent-forest-700",
            error ? "border-terracotta" : "border-border-strong",
          )}
        />
        <label htmlFor={controlId} className="cursor-pointer text-[0.875rem] leading-relaxed text-muted">
          {label}
        </label>
      </div>
      {error && (
        <p id={errorId} className="field-error" role="alert">
          <Icon name="alert" size={15} className="mt-px shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

/** Honeypot. Bots fill hidden inputs; humans never see or tab to this. */
export function Honeypot({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div aria-hidden className="absolute left-[-9999px] top-0 h-0 w-0 overflow-hidden">
      <label htmlFor="website-hp">Website (leave blank)</label>
      <input
        id="website-hp"
        name="website"
        type="text"
        tabIndex={-1}
        autoComplete="off"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
