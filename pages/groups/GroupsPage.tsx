'use client';

import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { GroupFiltersHead, ListGroups } from '../../components';
import { RE_FETCH_INTERVAL } from '../../constants';
import { useGroup } from '../../hooks';
import { GroupCrypto, GroupFilters, GroupPeriod } from '../../types';

export const GroupsPage = ({ address }: { address: string | null }) => {
  const [filters, setFilters] = useState<GroupFilters>({
    period: GroupPeriod.ALL,
    orderBy: '+amount',
    crypto: GroupCrypto.USDC,
    amount: 0,
  });
  const { getGroups } = useGroup();
  const { isPending, isLoading, data } = useQuery({
    refetchInterval: RE_FETCH_INTERVAL,
    queryKey: ['groups', filters, address],
    queryFn: () =>
      getGroups({
        publicKey: address,
        crypto: filters.crypto,
        orderBy: filters.orderBy,
        amount: filters.amount,
        period: filters.period,
      }),
  });

  const loading = isPending || isLoading; // || isFetching;
  const groups = data?.success ? data?.contents : [];

  return (
    <>
      <GroupFiltersHead filters={filters} setFilters={setFilters} />
      <ListGroups groups={groups} loading={loading} />
    </>
  );
};
