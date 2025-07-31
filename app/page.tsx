"use client"

import type React from "react"
import { useState, useCallback, useRef } from "react"
import { Moon, Sun, Upload, Github, FileText, Home, Loader2, ImageIcon, Box, Info, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTheme } from "next-themes"

const threejsDemos = [
  { label: "Animation Keyframes", value: "webgl_animation_keyframes.html" },
  { label: "Skinning Blending", value: "webgl_animation_skinning_blending.html" },
  { label: "IK Rigging", value: "webgl_animation_skinning_ik.html" },
  { label: "Walking Animation", value: "webgl_animation_walk.html" },
  { label: "Car Material", value: "webgl_materials_car.html" },
  { label: "Water Surface", value: "webgl_water.html" },
  { label: "Refraction Shader", value: "webgl_materials_cubemap_refraction.html" },
  { label: "Environment Map", value: "webgl_materials_envmaps.html" },
  { label: "Particle Fireball", value: "webgl_fireball.html" },
  { label: "Galaxy Simulation", value: "webgl_galaxy.html" },
  { label: "Depth of Field (DOF)", value: "webgl_postprocessing_dof2.html" },
  { label: "Video Texture", value: "webgl_video_kinect.html" },
  { label: "Morph Targets Horse", value: "webgl_morphtargets_horse.html" },
  { label: "Shader Lava", value: "webgl_shader_lava.html" },
  { label: "Skinning Simple", value: "webgl_animation_skinning.html" },
]

export default function HomePage() {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isConverting, setIsConverting] = useState(false)
  const [isConverted, setIsConverted] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [imageInfo, setImageInfo] = useState<{ width: number; height: number; size: string } | null>(null)
  const [selectedDemo, setSelectedDemo] = useState<string>("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { theme, setTheme } = useTheme()

  const handleFileUpload = useCallback((file: File) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setUploadedImage(result)
        setIsConverted(false)

        // Get image dimensions
        const img = new Image()
        img.onload = () => {
          setImageInfo({
            width: img.width,
            height: img.height,
            size: (file.size / 1024 / 1024).toFixed(2) + " MB",
          })
        }
        img.src = result
      }
      reader.readAsDataURL(file)
    }
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const files = Array.from(e.dataTransfer.files)
      if (files.length > 0) {
        handleFileUpload(files[0])
      }
    },
    [handleFileUpload],
  )

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleConvert = async () => {
    setIsConverting(true)
    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 3000))
    setIsConverting(false)
    setIsConverted(true)
  }

  const SpinningCube = () => (
    <div className="flex items-center justify-center h-full">
      <div className="relative w-32 h-32">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg animate-spin-slow shadow-2xl shadow-blue-500/25"></div>
        <div className="absolute inset-2 bg-gradient-to-r from-purple-600 to-pink-500 rounded-lg animate-pulse"></div>
        <div className="absolute inset-4 bg-gradient-to-r from-pink-500 to-blue-500 rounded-lg animate-bounce"></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/20 backdrop-blur-xl supports-[backdrop-filter]:bg-black/20">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              3D Demo Explorer
            </h1>
            <div className="hidden md:flex items-center space-x-6">
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <FileText className="mr-2 h-4 w-4" />
                Docs
              </Button>
              <Button variant="ghost" size="sm" className="text-white/80 hover:text-white hover:bg-white/10">
                <Github className="mr-2 h-4 w-4" />
                GitHub
              </Button>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            className="h-9 w-9 text-white/80 hover:text-white hover:bg-white/10"
          >
            <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <div className="space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-pulse">
            PixelDepth 3D
          </h1>
          <p className="text-xl md:text-2xl text-white/80 max-w-2xl mx-auto">
            Turn flat images into immersive 3D scenes
          </p>
          <div className="flex justify-center space-x-2">
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              AI Powered
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              Real-time
            </Badge>
            <Badge variant="secondary" className="bg-white/10 text-white border-white/20">
              High Quality
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-12">
        <div className="space-y-8">
          {/* Three.js Demo Explorer Section */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Play className="mr-2 h-5 w-5" />
                Choose a 3D Demo
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="demo-select" className="text-white">
                  Three.js Demonstrations
                </Label>
                <Select value={selectedDemo} onValueChange={setSelectedDemo}>
                  <SelectTrigger id="demo-select" className="bg-white/10 border-white/20 text-white">
                    <SelectValue placeholder="Select a Three.js demo to explore" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-white/20">
                    {threejsDemos.map((demo) => (
                      <SelectItem key={demo.value} value={demo.value} className="text-white hover:bg-white/10">
                        {demo.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dynamic Iframe */}
              {selectedDemo && (
                <div className="w-full animate-fade-in">
                  <iframe
                    src={`https://threejs.org/examples/${selectedDemo}`}
                    width="100%"
                    height="500"
                    style={{ border: "none", borderRadius: "12px" }}
                    className="shadow-2xl"
                    title="Three.js Demo"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upload Section */}
          <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Upload className="mr-2 h-5 w-5" />
                Upload Your Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {!uploadedImage ? (
                <div
                  className={`border-2 border-dashed rounded-xl p-12 text-center transition-all duration-300 ${
                    isDragging
                      ? "border-blue-400 bg-blue-400/10 scale-105"
                      : "border-white/20 hover:border-white/40 hover:bg-white/5"
                  }`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="space-y-4">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center animate-bounce">
                      <Upload className="h-8 w-8 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">Drop your image here</h3>
                      <p className="text-white/60">or click to browse files</p>
                      <p className="text-sm text-white/40 mt-2">Supports JPG, PNG up to 10MB</p>
                    </div>
                  </div>
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept=".jpg,.jpeg,.png"
                    onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0])}
                    className="hidden"
                  />
                </div>
              ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                  {/* Original Image */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center">
                      <ImageIcon className="mr-2 h-4 w-4" />
                      Original Image
                    </h4>
                    <div className="aspect-square rounded-lg overflow-hidden bg-white/5">
                      <img
                        src={uploadedImage || "/placeholder.svg"}
                        alt="Uploaded"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {imageInfo && (
                      <div className="space-y-2 text-sm text-white/60">
                        <p>
                          Dimensions: {imageInfo.width} × {imageInfo.height}px
                        </p>
                        <p>Size: {imageInfo.size}</p>
                      </div>
                    )}
                  </div>

                  {/* 3D Preview */}
                  <div className="space-y-4">
                    <h4 className="text-white font-semibold flex items-center">
                      <Box className="mr-2 h-4 w-4" />
                      3D Preview
                    </h4>
                    <div className="aspect-square rounded-lg bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                      {!isConverted && !isConverting && (
                        <div className="text-center space-y-4">
                          <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto">
                            <Box className="h-8 w-8 text-white/40" />
                          </div>
                          <p className="text-white/60">3D preview will appear here</p>
                        </div>
                      )}
                      {isConverting && (
                        <div className="text-center space-y-4">
                          <Loader2 className="h-12 w-12 text-blue-400 animate-spin mx-auto" />
                          <p className="text-white/80">Converting to 3D...</p>
                        </div>
                      )}
                      {isConverted && <SpinningCube />}
                    </div>
                  </div>
                </div>
              )}

              {/* Render Button */}
              {uploadedImage && (
                <div className="text-center">
                  <Button
                    onClick={handleConvert}
                    disabled={isConverting}
                    size="lg"
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold shadow-2xl shadow-blue-500/25 transform hover:scale-105 transition-all duration-300"
                  >
                    {isConverting ? (
                      <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Rendering...
                      </>
                    ) : (
                      <>
                        <Box className="mr-2 h-5 w-5" />
                        Render in 3D
                      </>
                    )}
                  </Button>
                </div>
              )}

              {/* Placeholder for 3D rendering */}
              {uploadedImage && !isConverted && !isConverting && (
                <div className="w-full h-64 bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg flex items-center justify-center border-2 border-dashed border-white/20">
                  <div className="text-center space-y-2">
                    <div className="text-4xl">🎨</div>
                    <p className="text-white/60">3D rendering will appear here</p>
                    <p className="text-sm text-white/40">Click "Render in 3D" to get started</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Results Tabs */}
          {isConverted && (
            <Card className="border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl animate-fade-in">
              <CardContent className="p-6">
                <Tabs defaultValue="depth" className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-white/10">
                    <TabsTrigger value="depth" className="data-[state=active]:bg-white/20 text-white">
                      Depth Map
                    </TabsTrigger>
                    <TabsTrigger value="mesh" className="data-[state=active]:bg-white/20 text-white">
                      Mesh Preview
                    </TabsTrigger>
                    <TabsTrigger value="info" className="data-[state=active]:bg-white/20 text-white">
                      Technical Info
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="depth" className="mt-6">
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-lg flex items-center justify-center">
                      <div className="text-center space-y-2">
                        <div className="w-12 h-12 bg-gradient-to-r from-gray-400 to-gray-600 rounded mx-auto"></div>
                        <p className="text-white/80">Depth Map Visualization</p>
                        <p className="text-sm text-white/60">Simulated depth analysis</p>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="mesh" className="mt-6">
                    <div className="aspect-video bg-gradient-to-br from-blue-900 to-purple-900 rounded-lg flex items-center justify-center">
                      <SpinningCube />
                    </div>
                  </TabsContent>

                  <TabsContent value="info" className="mt-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold flex items-center">
                          <Info className="mr-2 h-4 w-4" />
                          Processing Details
                        </h4>
                        <div className="space-y-2 text-sm text-white/80">
                          <div className="flex justify-between">
                            <span>Depth Range:</span>
                            <span>0.1m - 15.7m</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Mesh Vertices:</span>
                            <span>24,576</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Processing Time:</span>
                            <span>3.2s</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Quality Score:</span>
                            <span>94%</span>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold">Export Options</h4>
                        <div className="space-y-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            Download OBJ
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            Download PLY
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="w-full border-white/20 text-white hover:bg-white/10 bg-transparent"
                          >
                            Download STL
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-white/10 bg-black/20 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-6">
          <p className="text-center text-sm text-white/60">Three.js examples via iframe • Made with ❤️</p>
        </div>
      </footer>
    </div>
  )
}
