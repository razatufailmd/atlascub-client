"use client";

import { useState } from "react";
import { Plus, Loader2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useGetCategoriesQuery, useCreateCategoryMutation } from "@/lib/store/apis/category-api";

interface CategorySelectorProps {
  gender: string;
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  error?: string;
}

export function CategorySelector({ gender, value, onChange, disabled, error }: CategorySelectorProps) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategorySlug, setNewCategorySlug] = useState("");
  const [newCategoryDesc, setNewCategoryDesc] = useState("");
  
  const { data: categories, isLoading, refetch } = useGetCategoriesQuery(gender);
  const [createCategory, { isLoading: isCreating }] = useCreateCategoryMutation();
  
  const handleCreateCategory = async () => {
    if (!newCategoryName) {
      toast.error("Category name is required");
      return;
    }
    
    const slug = newCategorySlug || newCategoryName.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    
    try {
      await createCategory({
        name: newCategoryName,
        slug,
        gender,
        description: newCategoryDesc,
      }).unwrap();
      
      toast.success(`Category "${newCategoryName}" created successfully`);
      setIsDialogOpen(false);
      refetch();
      
      // Auto-select the new category
      onChange(slug);
      
      // Reset form
      setNewCategoryName("");
      setNewCategorySlug("");
      setNewCategoryDesc("");
    } catch (error) {
      toast.error("Failed to create category");
    }
  };
  
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <div className="flex-1">
          <Select value={value} onValueChange={onChange} disabled={disabled || isLoading}>
            <SelectTrigger className={error ? "border-destructive" : ""}>
              <SelectValue placeholder={isLoading ? "Loading categories..." : "Select category"} />
            </SelectTrigger>
            <SelectContent>
              {categories?.map((cat) => (
                <SelectItem key={cat.id} value={cat.slug}>
                  {cat.name}
                </SelectItem>
              ))}
              {/* "Other" is already in categories from database - no need to add manually */}
            </SelectContent>
          </Select>
          {error && <p className="text-xs text-destructive mt-1">{error}</p>}
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" size="icon" disabled={disabled}>
              <Plus className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Create New Category</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div>
                <Label htmlFor="cat-name">Category Name *</Label>
                <Input
                  id="cat-name"
                  placeholder="e.g., Denim Jackets"
                  value={newCategoryName}
                  onChange={(e) => {
                    setNewCategoryName(e.target.value);
                    setNewCategorySlug(e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
                  }}
                />
              </div>
              <div>
                <Label htmlFor="cat-slug">Slug (URL friendly)</Label>
                <Input
                  id="cat-slug"
                  placeholder="denim-jackets"
                  value={newCategorySlug}
                  onChange={(e) => setNewCategorySlug(e.target.value)}
                />
                <p className="text-xs text-muted-foreground mt-1">Used in URL: /shop/{gender}/[slug]</p>
              </div>
              <div>
                <Label htmlFor="cat-desc">Description (Optional)</Label>
                <Input
                  id="cat-desc"
                  placeholder="Brief description of this category"
                  value={newCategoryDesc}
                  onChange={(e) => setNewCategoryDesc(e.target.value)}
                />
              </div>
              <Button onClick={handleCreateCategory} disabled={isCreating} className="w-full">
                {isCreating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  "Create Category"
                )}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}