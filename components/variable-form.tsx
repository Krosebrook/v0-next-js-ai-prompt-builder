"use client"

import type React from "react"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import type { Variable, VariableType } from "@/lib/types"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { PlusCircle, Trash2 } from "lucide-react"
import { useState } from "react"

interface VariableFormProps {
  variable: Variable
  onChange: (variable: Variable) => void
}

export default function VariableForm({ variable, onChange }: VariableFormProps) {
  const [options, setOptions] = useState<{ value: string; label: string }[]>(variable.options || [])

  const handleTypeChange = (type: string) => {
    const updatedVariable: Variable = {
      ...variable,
      type: type as VariableType,
    }

    // Reset options if changing away from select/radio/combobox
    if (!["select", "radio", "combobox"].includes(type)) {
      updatedVariable.options = undefined
    }

    // Reset min/max/step if changing away from number/slider
    if (!["number", "slider"].includes(type)) {
      updatedVariable.min = undefined
      updatedVariable.max = undefined
      updatedVariable.step = undefined
    }

    onChange(updatedVariable)
  }

  const handleDefaultValueChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...variable,
      defaultValue: e.target.value,
    })
  }

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...variable,
      min: Number(e.target.value),
    })
  }

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...variable,
      max: Number(e.target.value),
    })
  }

  const handleStepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...variable,
      step: Number(e.target.value),
    })
  }

  const handlePlaceholderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({
      ...variable,
      placeholder: e.target.value,
    })
  }

  const handleAddOption = () => {
    const newOptions = [...(options || []), { value: "", label: "" }]
    setOptions(newOptions)
    onChange({
      ...variable,
      options: newOptions,
    })
  }

  const handleRemoveOption = (index: number) => {
    const newOptions = options.filter((_, i) => i !== index)
    setOptions(newOptions)
    onChange({
      ...variable,
      options: newOptions,
    })
  }

  const handleOptionChange = (index: number, field: "value" | "label", value: string) => {
    const newOptions = [...options]
    newOptions[index][field] = value
    setOptions(newOptions)
    onChange({
      ...variable,
      options: newOptions,
    })
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base">{variable.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor={`${variable.id}-type`}>Input Type</Label>
            <Select value={variable.type} onValueChange={handleTypeChange}>
              <SelectTrigger id={`${variable.id}-type`}>
                <SelectValue placeholder="Select input type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="text">Text Input</SelectItem>
                <SelectItem value="number">Number Input</SelectItem>
                <SelectItem value="file">File Input</SelectItem>
                <SelectItem value="textarea">Textarea</SelectItem>
                <SelectItem value="select">Select Dropdown</SelectItem>
                <SelectItem value="radio">Radio Group</SelectItem>
                <SelectItem value="checkbox">Checkbox</SelectItem>
                <SelectItem value="switch">Switch</SelectItem>
                <SelectItem value="date">Date Picker</SelectItem>
                <SelectItem value="dateRange">Date Range Picker</SelectItem>
                <SelectItem value="combobox">Combobox (Autocomplete)</SelectItem>
                <SelectItem value="slider">Slider</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Default value */}
          {!["file", "dateRange"].includes(variable.type) && (
            <div>
              <Label htmlFor={`${variable.id}-default`}>Default Value</Label>
              {variable.type === "textarea" ? (
                <Textarea
                  id={`${variable.id}-default`}
                  value={variable.defaultValue || ""}
                  onChange={handleDefaultValueChange}
                  placeholder="Default value"
                />
              ) : (
                <Input
                  id={`${variable.id}-default`}
                  type={variable.type === "number" ? "number" : "text"}
                  value={variable.defaultValue || ""}
                  onChange={handleDefaultValueChange}
                  placeholder="Default value"
                />
              )}
            </div>
          )}

          {/* Placeholder */}
          {["text", "textarea", "number"].includes(variable.type) && (
            <div>
              <Label htmlFor={`${variable.id}-placeholder`}>Placeholder</Label>
              <Input
                id={`${variable.id}-placeholder`}
                value={variable.placeholder || ""}
                onChange={handlePlaceholderChange}
                placeholder="Placeholder text"
              />
            </div>
          )}

          {/* Min, Max, Step for number and slider */}
          {["number", "slider"].includes(variable.type) && (
            <div className="grid grid-cols-3 gap-2">
              <div>
                <Label htmlFor={`${variable.id}-min`}>Min</Label>
                <Input
                  id={`${variable.id}-min`}
                  type="number"
                  value={variable.min || ""}
                  onChange={handleMinChange}
                  placeholder="Min"
                />
              </div>
              <div>
                <Label htmlFor={`${variable.id}-max`}>Max</Label>
                <Input
                  id={`${variable.id}-max`}
                  type="number"
                  value={variable.max || ""}
                  onChange={handleMaxChange}
                  placeholder="Max"
                />
              </div>
              <div>
                <Label htmlFor={`${variable.id}-step`}>Step</Label>
                <Input
                  id={`${variable.id}-step`}
                  type="number"
                  value={variable.step || ""}
                  onChange={handleStepChange}
                  placeholder="Step"
                />
              </div>
            </div>
          )}

          {/* Options for select, radio, combobox */}
          {["select", "radio", "combobox"].includes(variable.type) && (
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label>Options</Label>
                <Button variant="outline" size="sm" onClick={handleAddOption}>
                  <PlusCircle className="h-4 w-4 mr-1" />
                  Add Option
                </Button>
              </div>

              {options.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm border rounded-md">
                  No options added yet
                </div>
              ) : (
                <div className="space-y-2">
                  {options.map((option, index) => (
                    <div key={index} className="flex gap-2 items-center">
                      <Input
                        value={option.value}
                        onChange={(e) => handleOptionChange(index, "value", e.target.value)}
                        placeholder="Value"
                        className="flex-1"
                      />
                      <Input
                        value={option.label}
                        onChange={(e) => handleOptionChange(index, "label", e.target.value)}
                        placeholder="Label"
                        className="flex-1"
                      />
                      <Button variant="ghost" size="icon" onClick={() => handleRemoveOption(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
