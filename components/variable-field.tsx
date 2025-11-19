"use client"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import type { Variable } from "@/lib/types"

interface VariableFieldProps {
  variable: Variable
  value: any
  onChange: (value: any) => void
}

export default function VariableField({ variable, value, onChange }: VariableFieldProps) {
  const [open, setOpen] = useState(false) // For combobox and calendar

  const renderField = () => {
    switch (variable.type) {
      case "text":
        return (
          <Input
            id={`field-${variable.id}`}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={variable.placeholder || `Enter ${variable.name}`}
          />
        )

      case "number":
        return (
          <Input
            id={`field-${variable.id}`}
            type="number"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={variable.placeholder || `Enter ${variable.name}`}
            min={variable.min}
            max={variable.max}
            step={variable.step || 1}
          />
        )

      case "file":
        return (
          <Input
            id={`field-${variable.id}`}
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) {
                onChange(file.name)
              }
            }}
          />
        )

      case "textarea":
        return (
          <Textarea
            id={`field-${variable.id}`}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={variable.placeholder || `Enter ${variable.name}`}
          />
        )

      case "select":
        return (
          <Select value={value} onValueChange={onChange}>
            <SelectTrigger id={`field-${variable.id}`}>
              <SelectValue placeholder={`Select ${variable.name}`} />
            </SelectTrigger>
            <SelectContent>
              {variable.options?.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        )

      case "radio":
        return (
          <RadioGroup value={value} onValueChange={onChange}>
            {variable.options?.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem value={option.value} id={`radio-${variable.id}-${option.value}`} />
                <Label htmlFor={`radio-${variable.id}-${option.value}`}>{option.label}</Label>
              </div>
            ))}
          </RadioGroup>
        )

      case "checkbox":
        return (
          <div className="flex items-center space-x-2">
            <Checkbox id={`field-${variable.id}`} checked={value === true} onCheckedChange={onChange} />
            <Label htmlFor={`field-${variable.id}`}>{variable.name}</Label>
          </div>
        )

      case "switch":
        return (
          <div className="flex items-center space-x-2">
            <Switch id={`field-${variable.id}`} checked={value === true} onCheckedChange={onChange} />
            <Label htmlFor={`field-${variable.id}`}>{variable.name}</Label>
          </div>
        )

      case "date":
        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn("w-full justify-start text-left font-normal", !value && "text-muted-foreground")}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(new Date(value), "PPP") : `Select ${variable.name}`}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={value ? new Date(value) : undefined}
                onSelect={(date) => {
                  onChange(date ? date.toISOString() : "")
                  setOpen(false)
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        )

      case "dateRange":
        // Simplified date range implementation
        return (
          <div className="flex space-x-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value?.from ? format(new Date(value.from), "PPP") : "Start date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={value?.from ? new Date(value.from) : undefined}
                  onSelect={(date) => onChange({ ...value, from: date?.toISOString() })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {value?.to ? format(new Date(value.to), "PPP") : "End date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={value?.to ? new Date(value.to) : undefined}
                  onSelect={(date) => onChange({ ...value, to: date?.toISOString() })}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        )

      case "combobox":
        return (
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                {value
                  ? variable.options?.find((option) => option.value === value)?.label || value
                  : `Select ${variable.name}`}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
              <Command>
                <CommandInput placeholder={`Search ${variable.name}...`} />
                <CommandList>
                  <CommandEmpty>No option found.</CommandEmpty>
                  <CommandGroup>
                    {variable.options?.map((option) => (
                      <CommandItem
                        key={option.value}
                        value={option.value}
                        onSelect={(currentValue) => {
                          onChange(currentValue)
                          setOpen(false)
                        }}
                      >
                        <Check className={cn("mr-2 h-4 w-4", value === option.value ? "opacity-100" : "opacity-0")} />
                        {option.label}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        )

      case "slider":
        return (
          <div className="space-y-4">
            <Slider
              value={[Number.parseFloat(value) || 0]}
              min={variable.min || 0}
              max={variable.max || 100}
              step={variable.step || 1}
              onValueChange={(values) => onChange(values[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>{variable.min || 0}</span>
              <span>{value || 0}</span>
              <span>{variable.max || 100}</span>
            </div>
          </div>
        )

      default:
        return (
          <Input
            id={`field-${variable.id}`}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={`Enter ${variable.name}`}
          />
        )
    }
  }

  return (
    <div className="space-y-2">
      <Label htmlFor={`field-${variable.id}`}>{variable.name}</Label>
      {renderField()}
    </div>
  )
}
