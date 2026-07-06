import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Chip } from '@/components/ui/Chip';
import { FilterChip } from '@/components/ui/FilterChip';
import { Tag } from '@/components/ui/Tag';
import { OLQTag } from '@/components/ui/olq-tag';
import { IconButton } from '@/components/ui/IconButton';
import { Checkbox } from '@/components/ui/Checkbox';
import { Switch } from '@/components/ui/Switch';
import { TextField } from '@/components/ui/TextField';
import { TextArea } from '@/components/ui/TextArea';
import { DateField } from '@/components/ui/DateField';
import { Select, SelectItem } from '@/components/ui/Select';
import { Divider } from '@/components/ui/Divider';
import { SpotIcon } from '@/components/ui/SpotIcon';
import { Rating } from '@/components/ui/Rating';
import * as Icons from '@/components/icons';
import { PageHeader } from '@/components/ui/PageHeader';

type ComponentType = 
  | 'button' | 'badge' | 'chip' | 'filterchip' | 'tag' | 'olqtag' 
  | 'iconbutton' | 'checkbox' | 'switch' | 'textfield' | 'textarea'
  | 'datefield' | 'select' | 'divider' | 'spoticon' | 'rating';

const components = [
  { id: 'button', name: 'Button', category: 'Actions' },
  { id: 'iconbutton', name: 'Icon Button', category: 'Actions' },
  { id: 'badge', name: 'Badge', category: 'Display' },
  { id: 'chip', name: 'Chip', category: 'Selection' },
  { id: 'filterchip', name: 'Filter Chip', category: 'Selection' },
  { id: 'tag', name: 'Tag', category: 'Display' },
  { id: 'olqtag', name: 'OLQ Tag', category: 'Display' },
  { id: 'spoticon', name: 'Spot Icon', category: 'Display' },
  { id: 'rating', name: 'Rating', category: 'Display' },
  { id: 'textfield', name: 'Text Field', category: 'Forms' },
  { id: 'textarea', name: 'Text Area', category: 'Forms' },
  { id: 'datefield', name: 'Date Field', category: 'Forms' },
  { id: 'select', name: 'Select', category: 'Forms' },
  { id: 'checkbox', name: 'Checkbox', category: 'Forms' },
  { id: 'switch', name: 'Switch', category: 'Forms' },
  { id: 'divider', name: 'Divider', category: 'Layout' },
];

export default function ComponentTester() {
  const [selectedComponent, setSelectedComponent] = React.useState<ComponentType>('button');
  
  // Button props
  const [buttonVariant, setButtonVariant] = React.useState<'primary' | 'secondary' | 'tertiary' | 'destructive'>('primary');
  const [buttonSize, setButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [buttonText, setButtonText] = React.useState('Click me');
  
  // TextField props
  const [textFieldSize, setTextFieldSize] = React.useState<'small' | 'large'>('large');
  const [textFieldValue, setTextFieldValue] = React.useState('');
  const [textFieldError, setTextFieldError] = React.useState('');
  const [textFieldDisabled, setTextFieldDisabled] = React.useState(false);
  const [textFieldMagic, setTextFieldMagic] = React.useState(false);
  
  // TextArea props
  const [textAreaSize, setTextAreaSize] = React.useState<'small' | 'large'>('large');
  const [textAreaValue, setTextAreaValue] = React.useState('');
  const [textAreaDisabled, setTextAreaDisabled] = React.useState(false);
  const [textAreaMagic, setTextAreaMagic] = React.useState(false);
  
  // DateField props
  const [dateFieldValue, setDateFieldValue] = React.useState('');
  const [dateFieldDisabled, setDateFieldDisabled] = React.useState(false);
  
  // Switch props
  const [switchChecked, setSwitchChecked] = React.useState(false);
  const [switchDisabled, setSwitchDisabled] = React.useState(false);
  
  // Select props
  const [selectValue, setSelectValue] = React.useState('');
  const [selectSize, setSelectSize] = React.useState<'small' | 'large'>('large');
  const [selectDisabled, setSelectDisabled] = React.useState(false);
  
  // Badge props
  const [badgeVariant, setBadgeVariant] = React.useState<'info' | 'success' | 'warning' | 'error' | 'neutral'>('info');
  const [badgeContent, setBadgeContent] = React.useState('5');
  
  // Chip props
  const [chipSize, setChipSize] = React.useState<'small' | 'medium'>('medium');
  const [chipSelected, setChipSelected] = React.useState(false);
  const [chipText, setChipText] = React.useState('Chip Label');
  
  // Filter Chip props
  const [filterChipSelected, setFilterChipSelected] = React.useState(false);
  const [filterChipText, setFilterChipText] = React.useState('Filter');
  const [filterChipCount, setFilterChipCount] = React.useState(12);
  
  // Tag props
  const [tagVariant, setTagVariant] = React.useState<'primary' | 'secondary' | 'tertiary'>('secondary');
  const [tagColor, setTagColor] = React.useState<'brand' | 'positive' | 'negative' | 'warning' | 'info'>('brand');
  const [tagText, setTagText] = React.useState('Tag Label');
  
  // OLQ Tag props
  const [olqPercentage, setOlqPercentage] = React.useState(85);
  
  // Icon Button props
  const [iconButtonVariant, setIconButtonVariant] = React.useState<'ghost' | 'primary' | 'secondary' | 'destructive'>('ghost');
  const [iconButtonSize, setIconButtonSize] = React.useState<'small' | 'medium' | 'large'>('medium');
  
  // SpotIcon props
  const [spotIconSize, setSpotIconSize] = React.useState<'small' | 'large'>('small');
  const [spotIconColor, setSpotIconColor] = React.useState<'brand' | 'neutral'>('brand');
  
  // Rating props
  const [ratingValue, setRatingValue] = React.useState(4);
  
  // Checkbox props
  const [checkboxChecked, setCheckboxChecked] = React.useState(false);
  const [checkboxLabel, setCheckboxLabel] = React.useState('Checkbox Label');
  
  // Divider props
  const [dividerOrientation, setDividerOrientation] = React.useState<'horizontal' | 'vertical'>('horizontal');

  const renderComponent = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <Button
            variant={buttonVariant}
            size={buttonSize}
            disabled={buttonDisabled}
          >
            {buttonText}
          </Button>
        );
      
      case 'textfield':
        return (
          <TextField
            label="Label"
            size={textFieldSize}
            value={textFieldValue}
            onChange={(e) => setTextFieldValue(e.target.value)}
            error={textFieldError || undefined}
            disabled={textFieldDisabled}
            isMagic={textFieldMagic}
            placeholder="Enter text..."
            helperText="Helper text goes here"
          />
        );
      
      case 'textarea':
        return (
          <TextArea
            label="Label"
            size={textAreaSize}
            value={textAreaValue}
            onChange={(e) => setTextAreaValue(e.target.value)}
            disabled={textAreaDisabled}
            isMagic={textAreaMagic}
            placeholder="Enter text..."
            maxLength={200}
          />
        );
      
      case 'datefield':
        return (
          <DateField
            label="Date"
            value={dateFieldValue}
            onChange={(e) => setDateFieldValue(e.target.value)}
            disabled={dateFieldDisabled}
            showCalendarIcon
          />
        );
      
      case 'select':
        return (
          <Select
            label="Select Option"
            value={selectValue}
            onValueChange={setSelectValue}
            size={selectSize}
            disabled={selectDisabled}
          >
            <SelectItem value="option1">Option 1</SelectItem>
            <SelectItem value="option2">Option 2</SelectItem>
            <SelectItem value="option3">Option 3</SelectItem>
          </Select>
        );
      
      case 'switch':
        return (
          <Switch
            checked={switchChecked}
            onChange={setSwitchChecked}
            disabled={switchDisabled}
            label="Toggle option"
          />
        );
      
      case 'badge':
        return <Badge variant={badgeVariant} value={badgeContent} />;
      
      case 'chip':
        return (
          <Chip
            size={chipSize}
            selected={chipSelected}
            onClick={() => setChipSelected(!chipSelected)}
          >
            {chipText}
          </Chip>
        );
      
      case 'filterchip':
        return (
          <FilterChip
            selected={filterChipSelected}
            count={filterChipCount}
            onClick={() => setFilterChipSelected(!filterChipSelected)}
          >
            {filterChipText}
          </FilterChip>
        );
      
      case 'tag':
        return (
          <Tag variant={tagVariant} color={tagColor}>
            {tagText}
          </Tag>
        );
      
      case 'olqtag':
        return <OLQTag value={`${olqPercentage}%`} />;
      
      case 'iconbutton':
        return (
          <IconButton
            variant={iconButtonVariant}
            size={iconButtonSize}
            aria-label="Settings"
          >
            <Icons.Settings style={{ width: 20, height: 20 }} />
          </IconButton>
        );
      
      case 'spoticon':
        return (
          <SpotIcon
            size={spotIconSize as 'small' | 'large'}
            color={spotIconColor}
            icon={<Icons.Star style={{ width: 24, height: 24 }} />}
          />
        );
      
      case 'rating':
        return (
          <Rating
            value={ratingValue}
            size="large"
          />
        );
      
      case 'checkbox':
        return (
          <Checkbox
            checked={checkboxChecked}
            onCheckedChange={(checked) => setCheckboxChecked(checked as boolean)}
            label={checkboxLabel}
          />
        );
      
      case 'divider':
        return (
          <div style={{ width: dividerOrientation === 'horizontal' ? '100%' : '2px', height: dividerOrientation === 'vertical' ? '200px' : 'auto' }}>
            <Divider orientation={dividerOrientation} />
          </div>
        );
      
      default:
        return null;
    }
  };

  const renderControls = () => {
    switch (selectedComponent) {
      case 'button':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Variant
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['primary', 'secondary', 'tertiary', 'destructive'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={buttonVariant === variant}
                    onClick={() => setButtonVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Size
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={buttonSize === size}
                    onClick={() => setButtonSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label="Button Text"
                size="small"
                value={buttonText}
                onChange={(e) => setButtonText(e.target.value)}
              />
            </div>
            
            <div>
              <Checkbox
                checked={buttonDisabled}
                onCheckedChange={(checked) => setButtonDisabled(checked as boolean)}
                label="Disabled"
              />
            </div>
          </div>
        );
      
      case 'textfield':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Size
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={textFieldSize === size}
                    onClick={() => setTextFieldSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label="Error Message"
                size="small"
                value={textFieldError}
                onChange={(e) => setTextFieldError(e.target.value)}
                placeholder="Leave empty for no error"
              />
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Checkbox
                checked={textFieldDisabled}
                onCheckedChange={(checked) => setTextFieldDisabled(checked as boolean)}
                label="Disabled"
              />
              <Checkbox
                checked={textFieldMagic}
                onCheckedChange={(checked) => setTextFieldMagic(checked as boolean)}
                label="Magic (AI) State"
              />
            </div>
          </div>
        );
      
      case 'textarea':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Size
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={textAreaSize === size}
                    onClick={() => setTextAreaSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <Checkbox
                checked={textAreaDisabled}
                onCheckedChange={(checked) => setTextAreaDisabled(checked as boolean)}
                label="Disabled"
              />
              <Checkbox
                checked={textAreaMagic}
                onCheckedChange={(checked) => setTextAreaMagic(checked as boolean)}
                label="Magic (AI) State"
              />
            </div>
          </div>
        );
      
      case 'datefield':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <Checkbox
                checked={dateFieldDisabled}
                onCheckedChange={(checked) => setDateFieldDisabled(checked as boolean)}
                label="Disabled"
              />
            </div>
          </div>
        );
      
      case 'select':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Size
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={selectSize === size}
                    onClick={() => setSelectSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <Checkbox
                checked={selectDisabled}
                onCheckedChange={(checked) => setSelectDisabled(checked as boolean)}
                label="Disabled"
              />
            </div>
          </div>
        );
      
      case 'switch':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <Checkbox
                checked={switchDisabled}
                onCheckedChange={(checked) => setSwitchDisabled(checked as boolean)}
                label="Disabled"
              />
            </div>
          </div>
        );
      
      case 'badge':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Variant
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['neutral', 'info', 'success', 'warning', 'error'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={badgeVariant === variant}
                    onClick={() => setBadgeVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label="Badge Content"
                size="small"
                value={badgeContent}
                onChange={(e) => setBadgeContent(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'chip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Size
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={chipSize === size}
                    onClick={() => setChipSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label="Chip Text"
                size="small"
                value={chipText}
                onChange={(e) => setChipText(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'filterchip':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label="Filter Text"
                size="small"
                value={filterChipText}
                onChange={(e) => setFilterChipText(e.target.value)}
              />
            </div>

            <div>
              <TextField
                label="Count"
                size="small"
                type="number"
                value={String(filterChipCount)}
                onChange={(e) => setFilterChipCount(Number(e.target.value))}
              />
            </div>
          </div>
        );
      
      case 'tag':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Variant
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['primary', 'secondary', 'tertiary'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={tagVariant === variant}
                    onClick={() => setTagVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Color
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['brand', 'positive', 'negative', 'warning', 'info'] as const).map((color) => (
                  <Chip
                    key={color}
                    size="small"
                    selected={tagColor === color}
                    onClick={() => setTagColor(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <TextField
                label="Tag Text"
                size="small"
                value={tagText}
                onChange={(e) => setTagText(e.target.value)}
              />
            </div>
          </div>
        );
      
      case 'olqtag':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label="Percentage"
                size="small"
                type="number"
                value={String(olqPercentage)}
                onChange={(e) => setOlqPercentage(Number(e.target.value))}
                inputProps={{ min: 0, max: 100 }}
              />
            </div>
          </div>
        );
      
      case 'iconbutton':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Variant
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['ghost', 'primary', 'secondary', 'destructive'] as const).map((variant) => (
                  <Chip
                    key={variant}
                    size="small"
                    selected={iconButtonVariant === variant}
                    onClick={() => setIconButtonVariant(variant)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Size
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'medium', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={iconButtonSize === size}
                    onClick={() => setIconButtonSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'spoticon':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Size
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['small', 'large'] as const).map((size) => (
                  <Chip
                    key={size}
                    size="small"
                    selected={spotIconSize === size}
                    onClick={() => setSpotIconSize(size)}
                  >
                    {size.charAt(0).toUpperCase() + size.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
            
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Color
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['brand', 'neutral'] as const).map((color) => (
                  <Chip
                    key={color}
                    size="small"
                    selected={spotIconColor === color}
                    onClick={() => setSpotIconColor(color)}
                  >
                    {color.charAt(0).toUpperCase() + color.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'rating':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label="Value (0-5, supports 0.5 increments)"
                size="small"
                type="number"
                value={String(ratingValue)}
                onChange={(e) => setRatingValue(Number(e.target.value))}
                inputProps={{ min: 0, max: 5, step: 0.5 }}
              />
            </div>

            <div style={{
              padding: '12px',
              backgroundColor: 'var(--ld-semantic-color-fill-info-subtle)',
              borderRadius: '6px',
              fontSize: '13px',
              color: 'var(--ld-semantic-color-text-subtle)'
            }}>
              Rating is display-only (not interactive). Shows 0-5 stars with half-star support.
            </div>
          </div>
        );
      
      case 'divider':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <div style={{ fontSize: '14px', fontWeight: '700', marginBottom: '12px', color: 'var(--ld-semantic-color-text)' }}>
                Orientation
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {(['horizontal', 'vertical'] as const).map((orientation) => (
                  <Chip
                    key={orientation}
                    size="small"
                    selected={dividerOrientation === orientation}
                    onClick={() => setDividerOrientation(orientation)}
                  >
                    {orientation.charAt(0).toUpperCase() + orientation.slice(1)}
                  </Chip>
                ))}
              </div>
            </div>
          </div>
        );
      
      case 'checkbox':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            <div>
              <TextField
                label="Label Text"
                size="small"
                value={checkboxLabel}
                onChange={(e) => setCheckboxLabel(e.target.value)}
              />
            </div>
          </div>
        );
      
      default:
        return (
          <div style={{
            padding: '32px',
            textAlign: 'center',
            color: 'var(--ld-semantic-color-text-subtle)',
            fontSize: '14px'
          }}>
            Select a component to configure its properties
          </div>
        );
    }
  };

  // Group components by category
  const groupedComponents = components.reduce((acc, component) => {
    if (!acc[component.category]) {
      acc[component.category] = [];
    }
    acc[component.category].push(component);
    return acc;
  }, {} as Record<string, typeof components>);

  return (
    <div style={{
      padding: 'clamp(24px, 4vw, 48px)',
      maxWidth: '1400px',
      margin: '0 auto'
    }}>
      {/* Header */}
      <PageHeader section="Getting Started" title="Component Sandbox" description="Interactive testing environment for Living Design 3.5 components. Select a component and adjust its properties in real-time." />

      {/* Component Selector */}
      <div style={{ marginBottom: '32px', maxWidth: '500px' }}>
        <Select
          label="Select Component to Test"
          value={selectedComponent}
          onValueChange={(value) => setSelectedComponent(value as ComponentType)}
          size="large"
        >
          {Object.entries(groupedComponents).map(([category, items]) => (
            <React.Fragment key={category}>
              <SelectItem value={`category-${category}`} disabled>
                {category}
              </SelectItem>
              {items.map((component) => (
                <SelectItem key={component.id} value={component.id}>
                  {component.name}
                </SelectItem>
              ))}
            </React.Fragment>
          ))}
        </Select>
      </div>

      {/* Main Content Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(400px, 100%), 1fr))',
        gap: '32px'
      }}>
        {/* Component Preview */}
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
          }}>
            Preview
          </h2>
          
          <div style={{
            minHeight: '200px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '32px',
            backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
            borderRadius: '8px'
          }}>
            {renderComponent()}
          </div>
        </div>

        {/* Property Controls */}
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-surface)',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: 'var(--ld-semantic-elevation-100)'
        }}>
          <h2 style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'var(--ld-semantic-color-text)',
            marginBottom: '24px',
            paddingBottom: '16px',
            borderBottom: '2px solid var(--ld-semantic-color-border-subtle)'
          }}>
            Properties
          </h2>
          
          {renderControls()}
        </div>
      </div>

      {/* Usage Code */}
      <div style={{
        marginTop: '32px',
        backgroundColor: 'var(--ld-semantic-color-surface)',
        padding: '32px',
        borderRadius: '8px',
        boxShadow: 'var(--ld-semantic-elevation-100)'
      }}>
        <h2 style={{
          fontSize: '20px',
          fontWeight: '700',
          color: 'var(--ld-semantic-color-text)',
          marginBottom: '16px'
        }}>
          Code Example
        </h2>
        
        <div style={{
          backgroundColor: 'var(--ld-semantic-color-fill-subtle)',
          padding: '20px',
          borderRadius: '6px',
          fontFamily: 'var(--ld-semantic-font-family-mono)',
          fontSize: '13px',
          lineHeight: '1.6',
          color: 'var(--ld-semantic-color-text)',
          overflowX: 'auto'
        }}>
          {selectedComponent === 'button' && (
            <pre style={{ margin: 0 }}>
              {`<Button
  variant="${buttonVariant}"
  size="${buttonSize}"${buttonDisabled ? '\n  disabled' : ''}
>
  ${buttonText}
</Button>`}
            </pre>
          )}
          {selectedComponent === 'textfield' && (
            <pre style={{ margin: 0 }}>
              {`<TextField
  label="Label"
  size="${textFieldSize}"${textFieldError ? `\n  error="${textFieldError}"` : ''}${textFieldDisabled ? '\n  disabled' : ''}${textFieldMagic ? '\n  isMagic' : ''}
  placeholder="Enter text..."
/>`}
            </pre>
          )}
          {selectedComponent === 'textarea' && (
            <pre style={{ margin: 0 }}>
              {`<TextArea
  label="Label"
  size="${textAreaSize}"${textAreaDisabled ? '\n  disabled' : ''}${textAreaMagic ? '\n  isMagic' : ''}
  maxLength={200}
/>`}
            </pre>
          )}
          {selectedComponent === 'chip' && (
            <pre style={{ margin: 0 }}>
              {`<Chip
  size="${chipSize}"
  selected={${chipSelected}}
  onClick={handleClick}
>
  ${chipText}
</Chip>`}
            </pre>
          )}
          {selectedComponent === 'tag' && (
            <pre style={{ margin: 0 }}>
              {`<Tag
  variant="${tagVariant}"
  color="${tagColor}"
>
  ${tagText}
</Tag>`}
            </pre>
          )}
          {selectedComponent === 'switch' && (
            <pre style={{ margin: 0 }}>
              {`<Switch
  checked={${switchChecked}}
  onCheckedChange={setChecked}${switchDisabled ? '\n  disabled' : ''}
  label="Toggle option"
/>`}
            </pre>
          )}
        </div>
      </div>
    </div>
  );
}
