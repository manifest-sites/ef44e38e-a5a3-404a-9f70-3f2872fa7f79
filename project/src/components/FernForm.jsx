import { Form, Input, Select, Button, Switch, Space, message } from 'antd'
import { useEffect } from 'react'

const { TextArea } = Input
const { Option } = Select

function FernForm({ fern, onSave, onCancel }) {
  const [form] = Form.useForm()

  useEffect(() => {
    if (fern) {
      form.setFieldsValue({
        name: fern.name,
        scientificName: fern.scientificName,
        description: fern.description,
        habitat: fern.habitat,
        sunRequirement: fern.sunRequirement,
        waterRequirement: fern.waterRequirement,
        difficulty: fern.difficulty,
        height: fern.height,
        imageUrl: fern.imageUrl,
        isFavorite: fern.isFavorite
      })
    } else {
      form.resetFields()
    }
  }, [fern, form])

  const handleSubmit = async (values) => {
    try {
      await onSave(values)
      form.resetFields()
    } catch (error) {
      message.error('Failed to save fern')
    }
  }

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleSubmit}
      className="space-y-4"
      initialValues={{
        sunRequirement: 'partial shade',
        waterRequirement: 'medium',
        difficulty: 'easy',
        isFavorite: false
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          name="name"
          label="Common Name"
          rules={[{ required: true, message: 'Please enter the fern name' }]}
        >
          <Input placeholder="e.g., Boston Fern" />
        </Form.Item>

        <Form.Item
          name="scientificName"
          label="Scientific Name"
          rules={[{ required: true, message: 'Please enter the scientific name' }]}
        >
          <Input placeholder="e.g., Nephrolepis exaltata" />
        </Form.Item>
      </div>

      <Form.Item
        name="description"
        label="Description"
      >
        <TextArea 
          rows={3} 
          placeholder="Describe the fern's appearance, characteristics, and care notes..."
        />
      </Form.Item>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Form.Item
          name="habitat"
          label="Natural Habitat"
        >
          <Input placeholder="e.g., Tropical rainforests" />
        </Form.Item>

        <Form.Item
          name="height"
          label="Mature Height"
        >
          <Input placeholder="e.g., 1-3 feet" />
        </Form.Item>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Form.Item
          name="sunRequirement"
          label="Sun Requirement"
        >
          <Select>
            <Option value="full sun">Full Sun ☀️</Option>
            <Option value="partial shade">Partial Shade ⛅</Option>
            <Option value="shade">Shade 🌫️</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="waterRequirement"
          label="Water Requirement"
        >
          <Select>
            <Option value="low">Low 💧</Option>
            <Option value="medium">Medium 💧💧</Option>
            <Option value="high">High 💧💧💧</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="difficulty"
          label="Care Difficulty"
        >
          <Select>
            <Option value="easy">Easy</Option>
            <Option value="medium">Medium</Option>
            <Option value="hard">Hard</Option>
          </Select>
        </Form.Item>
      </div>

      <Form.Item
        name="imageUrl"
        label="Image URL (optional)"
      >
        <Input placeholder="https://example.com/fern-image.jpg" />
      </Form.Item>

      <Form.Item
        name="isFavorite"
        label="Mark as Favorite"
        valuePropName="checked"
      >
        <Switch />
      </Form.Item>

      <div className="flex justify-end space-x-2 pt-4 border-t">
        <Button onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          type="primary" 
          htmlType="submit"
          className="bg-green-600 hover:bg-green-700 border-green-600"
        >
          {fern ? 'Update Fern' : 'Add Fern'}
        </Button>
      </div>
    </Form>
  )
}

export default FernForm