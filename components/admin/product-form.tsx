"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Plus, X, Image as ImageIcon, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useCreateProductMutation, useUpdateProductMutation } from "@/lib/store/apis/product-api";

// Form schema
const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  price: z.number().min(0, "Price must be positive"),
  compareAtPrice: z.number().optional(),
  sizes: z.array(z.string()).min(1, "Select at least one size"),
  colors: z.array(z.object({ name: z.string(), value: z.string() })),
  images: z.array(z.string()).min(1, "Add at least one image"),
  category: z.string().min(1, "Select a category"),
  gender: z.string().min(1, "Select a gender"),
  inventory: z.number().min(0),
  inStock: z.boolean(),
  isNew: z.boolean(),
  isBestSeller: z.boolean(),
  details: z.string().optional(),
  sizing: z.string().optional(),
  shipping: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const sizeOptions = ["XS", "S", "M", "L", "XL", "XXL"];
const genderOptions = ["men", "women", "kids"];
const categoryOptions = {
  men: ["ethnic", "tops", "outerwear", "bottoms", "accessories"],
  women: ["ethnic", "tops", "outerwear", "bottoms", "accessories"],
  kids: ["ethnic", "tops", "bottoms", "accessories"],
};

interface ProductFormProps {
  initialData?: any;
  isEditing?: boolean;
}

export function ProductForm({ initialData, isEditing = false }: ProductFormProps) {
  const router = useRouter();
  const [selectedGender, setSelectedGender] = useState(initialData?.gender || "men");
  const [imageUrls, setImageUrls] = useState<string[]>(initialData?.images || []);
  const [imageInput, setImageInput] = useState("");
  const [selectedSizes, setSelectedSizes] = useState<string[]>(initialData?.sizes || []);
  const [selectedColors, setSelectedColors] = useState<{ name: string; value: string }[]>(
    initialData?.colors || []
  );
  const [colorName, setColorName] = useState("");
  const [colorValue, setColorValue] = useState("#000000");

  const [createProduct, { isLoading: isCreating }] = useCreateProductMutation();
  const [updateProduct, { isLoading: isUpdating }] = useUpdateProductMutation();

  const isLoading = isCreating || isUpdating;

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const addColor = () => {
    if (colorName && colorValue && !selectedColors.find((c) => c.name === colorName)) {
      setSelectedColors([...selectedColors, { name: colorName, value: colorValue }]);
      setColorName("");
      setColorValue("#000000");
    }
  };

  const removeColor = (colorName: string) => {
    setSelectedColors(selectedColors.filter((c) => c.name !== colorName));
  };

  const addImage = () => {
    if (imageInput && !imageUrls.includes(imageInput)) {
      setImageUrls([...imageUrls, imageInput]);
      setImageInput("");
    }
  };

  const removeImage = (index: number) => {
    setImageUrls(imageUrls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const productData = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      price: parseFloat(formData.get("price") as string),
      compareAtPrice: parseFloat(formData.get("compareAtPrice") as string) || undefined,
      sizes: selectedSizes,
      colors: selectedColors,
      images: imageUrls,
      category: formData.get("category") as string,
      gender: selectedGender,
      inventory: parseInt(formData.get("inventory") as string),
      inStock: formData.get("inStock") === "on",
      isNew: formData.get("isNew") === "on",
      isBestSeller: formData.get("isBestSeller") === "on",
      details: (formData.get("details") as string) || undefined,
      sizing: (formData.get("sizing") as string) || undefined,
      shipping: (formData.get("shipping") as string) || undefined,
    };

    try {
      if (isEditing && initialData) {
        await updateProduct({ id: initialData.id, data: productData }).unwrap();
        toast.success("Product updated successfully!");
      } else {
        await createProduct(productData).unwrap();
        toast.success("Product created successfully!");
      }
      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      toast.error("Failed to save product");
      console.error(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="name">Product Name *</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={initialData?.name}
                  required
                  placeholder="Premium Linen Shirt"
                />
              </div>
              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  defaultValue={initialData?.description}
                  required
                  rows={4}
                  placeholder="Detailed product description..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="price">Price (₹) *</Label>
                  <Input
                    id="price"
                    name="price"
                    type="number"
                    defaultValue={initialData?.price}
                    required
                    placeholder="2999"
                  />
                </div>
                <div>
                  <Label htmlFor="compareAtPrice">Compare at Price (₹)</Label>
                  <Input
                    id="compareAtPrice"
                    name="compareAtPrice"
                    type="number"
                    defaultValue={initialData?.compareAtPrice}
                    placeholder="4999"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Sizes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {sizeOptions.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`h-10 w-12 rounded-md border text-sm font-medium transition-all ${
                      selectedSizes.includes(size)
                        ? "border-primary bg-primary text-primary-foreground"
                        : "border-border bg-background hover:border-primary"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Color name (e.g., Black)"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                />
                <Input
                  type="color"
                  value={colorValue}
                  onChange={(e) => setColorValue(e.target.value)}
                  className="w-16"
                />
                <Button type="button" onClick={addColor} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex flex-wrap gap-3">
                {selectedColors.map((color) => (
                  <div
                    key={color.name}
                    className="flex items-center gap-2 rounded-md border border-border px-3 py-1"
                  >
                    <div
                      className="h-5 w-5 rounded-full"
                      style={{ backgroundColor: color.value }}
                    />
                    <span className="text-sm">{color.name}</span>
                    <button
                      type="button"
                      onClick={() => removeColor(color.name)}
                      className="text-muted-foreground hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Images</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Image URL"
                  value={imageInput}
                  onChange={(e) => setImageInput(e.target.value)}
                />
                <Button type="button" onClick={addImage} size="icon">
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {imageUrls.map((url, index) => (
                  <div key={index} className="group relative aspect-square rounded-md border">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={url}
                      alt={`Product image ${index + 1}`}
                      className="h-full w-full object-cover rounded-md"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Category & Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="gender">Gender *</Label>
                <select
                  id="gender"
                  name="gender"
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-3 py-2"
                  required
                >
                  {genderOptions.map((g) => (
                    <option key={g} value={g}>
                      {g.charAt(0).toUpperCase() + g.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="category">Category *</Label>
                <select
                  id="category"
                  name="category"
                  defaultValue={initialData?.category}
                  className="w-full rounded-md border border-border bg-background px-3 py-2"
                  required
                >
                  <option value="">Select category</option>
                  {categoryOptions[selectedGender as keyof typeof categoryOptions]?.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat.charAt(0).toUpperCase() + cat.slice(1)}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label htmlFor="inventory">Inventory Count *</Label>
                <Input
                  id="inventory"
                  name="inventory"
                  type="number"
                  defaultValue={initialData?.inventory || 0}
                  required
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="inStock">In Stock</Label>
                <Switch id="inStock" name="inStock" defaultChecked={initialData?.inStock} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="isNew">New Arrival</Label>
                <Switch id="isNew" name="isNew" defaultChecked={initialData?.isNew} />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="isBestSeller">Best Seller</Label>
                <Switch id="isBestSeller" name="isBestSeller" defaultChecked={initialData?.isBestSeller} />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="details">Product Details</Label>
                <Textarea
                  id="details"
                  name="details"
                  defaultValue={initialData?.details}
                  rows={3}
                  placeholder="Fabric composition, care instructions, features..."
                />
              </div>
              <div>
                <Label htmlFor="sizing">Sizing Information</Label>
                <Textarea
                  id="sizing"
                  name="sizing"
                  defaultValue={initialData?.sizing}
                  rows={3}
                  placeholder="Fit guide, model measurements..."
                />
              </div>
              <div>
                <Label htmlFor="shipping">Shipping Information</Label>
                <Textarea
                  id="shipping"
                  name="shipping"
                  defaultValue={initialData?.shipping}
                  rows={3}
                  placeholder="Delivery time, return policy..."
                />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.push("/admin/products")}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {isEditing ? "Updating..." : "Creating..."}
            </>
          ) : (
            <>{isEditing ? "Update Product" : "Create Product"}</>
          )}
        </Button>
      </div>
    </form>
  );
}