import { useState, useEffect } from 'react'
import { Layout, Typography, Button, Input, Space, Card, Tag, Rate, Modal, Form, Select, message } from 'antd'
import { PlusOutlined, SearchOutlined, HeartOutlined, HeartFilled } from '@ant-design/icons'
import { Fern } from '../entities/Fern'
import FernCard from './FernCard'
import FernForm from './FernForm'

const { Header, Content } = Layout
const { Title, Text } = Typography
const { Search } = Input
const { Option } = Select

function FernApp() {
  const [ferns, setFerns] = useState([])
  const [filteredFerns, setFilteredFerns] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [difficultyFilter, setDifficultyFilter] = useState('all')
  const [showFavorites, setShowFavorites] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false)
  const [editingFern, setEditingFern] = useState(null)

  useEffect(() => {
    loadFerns()
  }, [])

  useEffect(() => {
    applyFilters()
  }, [ferns, searchTerm, difficultyFilter, showFavorites])

  const loadFerns = async () => {
    try {
      setLoading(true)
      const response = await Fern.list()
      if (response.success) {
        setFerns(response.data || [])
        if (response.data.length === 0) {
          addSampleFerns()
        }
      }
    } catch (error) {
      message.error('Failed to load ferns')
    } finally {
      setLoading(false)
    }
  }

  const addSampleFerns = async () => {
    const sampleFerns = [
      {
        name: "Boston Fern",
        scientificName: "Nephrolepis exaltata",
        description: "A popular houseplant with graceful, arching fronds. Perfect for hanging baskets and humid environments.",
        habitat: "Tropical and subtropical regions",
        sunRequirement: "partial shade",
        waterRequirement: "high",
        difficulty: "easy",
        height: "1-3 feet",
        imageUrl: "https://images.unsplash.com/photo-1586771107445-d3ca888129ff?w=400&h=300&fit=crop",
        isFavorite: false
      },
      {
        name: "Maidenhair Fern",
        scientificName: "Adiantum raddianum",
        description: "Delicate, lacy fronds with thin black stems. Requires consistent moisture and humidity.",
        habitat: "Moist, shaded forest floors",
        sunRequirement: "shade",
        waterRequirement: "high",
        difficulty: "hard",
        height: "1-2 feet",
        imageUrl: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=400&h=300&fit=crop",
        isFavorite: true
      },
      {
        name: "Bird's Nest Fern",
        scientificName: "Asplenium nidus",
        description: "Broad, glossy fronds that form a nest-like rosette. Great for low-light conditions.",
        habitat: "Tropical rainforest epiphyte",
        sunRequirement: "shade",
        waterRequirement: "medium",
        difficulty: "easy",
        height: "2-3 feet",
        imageUrl: "https://images.unsplash.com/photo-1631205750770-7762de17d9fe?w=400&h=300&fit=crop",
        isFavorite: false
      }
    ]

    for (const fern of sampleFerns) {
      try {
        await Fern.create(fern)
      } catch (error) {
        console.error('Failed to create sample fern:', error)
      }
    }
    loadFerns()
  }

  const applyFilters = () => {
    let filtered = [...ferns]

    if (searchTerm) {
      filtered = filtered.filter(fern => 
        fern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fern.scientificName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        fern.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (difficultyFilter !== 'all') {
      filtered = filtered.filter(fern => fern.difficulty === difficultyFilter)
    }

    if (showFavorites) {
      filtered = filtered.filter(fern => fern.isFavorite)
    }

    setFilteredFerns(filtered)
  }

  const handleSaveFern = async (fernData) => {
    try {
      if (editingFern) {
        await Fern.update(editingFern._id, fernData)
        message.success('Fern updated successfully!')
      } else {
        await Fern.create(fernData)
        message.success('Fern added successfully!')
      }
      setIsModalVisible(false)
      setEditingFern(null)
      loadFerns()
    } catch (error) {
      message.error('Failed to save fern')
    }
  }

  const handleEditFern = (fern) => {
    setEditingFern(fern)
    setIsModalVisible(true)
  }

  const handleToggleFavorite = async (fern) => {
    try {
      await Fern.update(fern._id, { ...fern, isFavorite: !fern.isFavorite })
      loadFerns()
    } catch (error) {
      message.error('Failed to update favorite status')
    }
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy': return 'green'
      case 'medium': return 'orange'
      case 'hard': return 'red'
      default: return 'default'
    }
  }

  return (
    <Layout className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <Header className="bg-white shadow-sm border-b border-green-200">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-full">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">🌿</div>
            <Title level={2} className="m-0 text-green-800">Fern Collection</Title>
          </div>
          <Button 
            type="primary" 
            icon={<PlusOutlined />}
            onClick={() => setIsModalVisible(true)}
            className="bg-green-600 hover:bg-green-700 border-green-600"
          >
            Add Fern
          </Button>
        </div>
      </Header>

      <Content className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-6 bg-white p-4 rounded-lg shadow-sm">
            <Space direction="vertical" size="middle" className="w-full">
              <Search
                placeholder="Search ferns by name, scientific name, or description..."
                allowClear
                enterButton={<SearchOutlined />}
                size="large"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-md"
              />
              <Space wrap>
                <Select
                  value={difficultyFilter}
                  onChange={setDifficultyFilter}
                  style={{ width: 120 }}
                >
                  <Option value="all">All Levels</Option>
                  <Option value="easy">Easy</Option>
                  <Option value="medium">Medium</Option>
                  <Option value="hard">Hard</Option>
                </Select>
                <Button
                  type={showFavorites ? "primary" : "default"}
                  icon={showFavorites ? <HeartFilled /> : <HeartOutlined />}
                  onClick={() => setShowFavorites(!showFavorites)}
                  className={showFavorites ? "bg-red-500 border-red-500" : ""}
                >
                  Favorites
                </Button>
              </Space>
            </Space>
          </div>

          <div className="mb-4">
            <Text className="text-gray-600">
              Showing {filteredFerns.length} of {ferns.length} ferns
            </Text>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredFerns.map((fern) => (
              <FernCard
                key={fern._id}
                fern={fern}
                onEdit={handleEditFern}
                onToggleFavorite={handleToggleFavorite}
                getDifficultyColor={getDifficultyColor}
              />
            ))}
          </div>

          {filteredFerns.length === 0 && !loading && (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🌱</div>
              <Title level={3} className="text-gray-500">No ferns found</Title>
              <Text className="text-gray-400">
                {searchTerm || difficultyFilter !== 'all' || showFavorites
                  ? "Try adjusting your filters or search terms"
                  : "Start building your fern collection by adding your first fern!"
                }
              </Text>
            </div>
          )}
        </div>
      </Content>

      <Modal
        title={editingFern ? "Edit Fern" : "Add New Fern"}
        open={isModalVisible}
        onCancel={() => {
          setIsModalVisible(false)
          setEditingFern(null)
        }}
        footer={null}
        width={600}
      >
        <FernForm
          fern={editingFern}
          onSave={handleSaveFern}
          onCancel={() => {
            setIsModalVisible(false)
            setEditingFern(null)
          }}
        />
      </Modal>
    </Layout>
  )
}

export default FernApp