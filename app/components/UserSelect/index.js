import { useState, memo } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Select from 'Components/Select';
import QUERY from './query.graphql';
import UserSearchLabel from 'Components/UserSearchLabel';

const UserSelect = memo(
  ({
    name = 'usersSelect',
    placeholder = 'Select users.',
    isMulti = false,
    variables,
    onChange,
  }) => {
    const [search, setSearch] = useState('');

    const { loading, data } = useQuery(QUERY, {
      variables: {
        limit: 10,
        ...variables,
        search,
      },
    });

    return (
      <Select
        isSearchable
        name={name}
        isMulti={isMulti}
        isLoading={loading}
        onChange={onChange}
        onInputChange={setSearch}
        getOptionLabel={user => <UserSearchLabel user={user} />}
        getOptionValue={user => user.id}
        options={data?.users?.edges.map(({ node }) => node) || []}
        placeholder={placeholder}
      />
    );
  },
);

export default UserSelect;