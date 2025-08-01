import { Card, Tag, Button, Space, Typography } from 'antd'
import { EditOutlined, HeartOutlined, HeartFilled, DropletBlue, SunOutlined } from '@ant-design/icons'

const { Text, Title } = Typography
const { Meta } = Card

function FernCard({ fern, onEdit, onToggleFavorite, getDifficultyColor }) {
  const getSunIcon = (requirement) => {
    switch (requirement) {
      case 'full sun': return '☀️'
      case 'partial shade': return '⛅'
      case 'shade': return '🌫️'
      default: return '🌤️'
    }
  }

  const getWaterIcon = (requirement) => {
    switch (requirement) {
      case 'low': return '💧'
      case 'medium': return '💧💧'
      case 'high': return '💧💧💧'
      default: return '💧'
    }
  }

  return (
    <Card
      hoverable
      className="h-full transition-all duration-300 hover:shadow-lg border-green-200"
      cover={
        <div className="relative overflow-hidden h-48">
          <img
            alt={fern.name}
            src={fern.imageUrl || 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop'}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.src = 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=400&h=300&fit=crop'
            }}
          />
          <div className="absolute top-2 right-2">
            <Button
              type="text"
              shape="circle"
              icon={fern.isFavorite ? <HeartFilled className="text-red-500" /> : <HeartOutlined />}
              onClick={() => onToggleFavorite(fern)}
              className="bg-white/80 hover:bg-white"
            />
          </div>
        </div>
      }
      actions={[
        <Button
          key="edit"
          type="text"
          icon={<EditOutlined />}
          onClick={() => onEdit(fern)}
          className="text-green-600 hover:text-green-700"
        >
          Edit
        </Button>
      ]}
    >
      <Meta
        title={
          <div className="space-y-1">
            <Title level={4} className="m-0 text-green-800 leading-tight">
              {fern.name}
            </Title>
            <Text className="text-sm text-gray-500 italic">
              {fern.scientificName}
            </Text>
          </div>
        }
        description={
          <div className="space-y-3">
            <Text className="text-gray-600 text-sm line-clamp-3">
              {fern.description}
            </Text>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Text className="text-xs text-gray-500">Difficulty:</Text>
                <Tag color={getDifficultyColor(fern.difficulty)} className="text-xs">
                  {fern.difficulty?.toUpperCase() || 'UNKNOWN'}
                </Tag>
              </div>
              
              {fern.height && (
                <div className="flex items-center justify-between">
                  <Text className="text-xs text-gray-500">Height:</Text>
                  <Text className="text-xs">{fern.height}</Text>
                </div>
              )}
              
              <div className="flex items-center justify-between">
                <Space size="small">
                  <span title={`Sun: ${fern.sunRequirement || 'unknown'}`}>
                    {getSunIcon(fern.sunRequirement)}
                  </span>
                  <span title={`Water: ${fern.waterRequirement || 'unknown'}`}>
                    {getWaterIcon(fern.waterRequirement)}
                  </span>
                </Space>
                {fern.habitat && (
                  <Text className="text-xs text-gray-400 truncate max-w-24" title={fern.habitat}>
                    {fern.habitat}
                  </Text>
                )}
              </div>
            </div>
          </div>
        }
      />
    </Card>
  )
}

export default FernCard