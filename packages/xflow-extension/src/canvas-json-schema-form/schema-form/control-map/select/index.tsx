import React from 'react'
import { Form, Select as ASelect } from 'antd'
import type { IControlSchema } from '../../../interface'
import { FormItemWrapper } from '../../common/form-item-wrapper'
import { renderFormItemExtra } from '../../common/tooltip'

interface Props {
  controlSchema: IControlSchema
}

export const Select: React.FC<Props> = props => {
  const { controlSchema } = props
  const { required, tooltip, extra, name, label, placeholder, options = [], rules } = controlSchema

  return (
    <FormItemWrapper schema={controlSchema}>
      {({ hidden, disabled, initialValue }) => {
        return (
          <Form.Item
            name={name}
            label={label}
            initialValue={initialValue}
            tooltip={tooltip}
            extra={renderFormItemExtra(extra)}
            required={required}
            hidden={hidden}
            rules={rules}
          >
            <ASelect 
              disabled={disabled} 
              placeholder={placeholder}
              options={options.map(option => ({
                label: option.title,
                value: option.value
              }))}
            />
          </Form.Item>
        )
      }}
    </FormItemWrapper>
  )
}