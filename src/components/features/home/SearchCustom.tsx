import React from 'react';
import { BaseInput } from '@/components/shared/BaseInput';
import { BaseButton } from '@/components/shared/BaseButton';
import { SearchOutlined, LoadingOutlined } from '@ant-design/icons';

interface SearchCustomProps {
  onSearch: (value: string) => void;
  loading?: boolean;
  placeholder?: string;
}

export const SearchCustom: React.FC<SearchCustomProps> = ({
  onSearch,
  loading = false,
  placeholder = "Search GitHub users..."
}) => {
  const [value, setValue] = React.useState('');

  const handleSearch = () => {
    onSearch(value);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex gap-2 w-[400px]">
      <BaseInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="flex-1"
      />
      <BaseButton
        type="primary"
        onClick={handleSearch}
        disabled={loading}
        icon={loading ? <LoadingOutlined /> : <SearchOutlined />}
      >
        Search
      </BaseButton>
    </div>
  );
}; 