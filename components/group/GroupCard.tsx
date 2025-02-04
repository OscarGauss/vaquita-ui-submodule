'use client';

import Image from 'next/image';
import Link from 'next/link';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { GroupCrypto, GroupStatus } from '../../types';
import { Button } from '../buttons';

interface Props {
  id: string;
  crypto: GroupCrypto;
  name: string;
  amount: number;
  totalMembers: number;
  slots: number;
  period: 'monthly' | 'weekly' | 'all';
  startsOnTimestamp: number;
  status: GroupStatus;
}

export function GroupCard({
  name,
  amount,
  startsOnTimestamp,
  period,
  totalMembers,
  slots,
  id,
  crypto,
  status,
}: Props) {
  const handleViewDetails = (groupId: string) => {
    console.log(groupId);
  };

  return (
    <div className="flex justify-between style-bg-accent-dark px-5 pt-4 pb-6 rounded-lg">
      <div className="w-2/3">
        <p className="text-primary-200 text-2xl font-bold">{name}</p>
        <div className="flex gap-1">
          <p className="flex">
            <Image
              src="/icons/date-active.svg"
              alt="members"
              width={12}
              height={12}
            />
            <span className="ml-1">{period}</span>
          </p>
          <p className="flex items-center">
            <HiArrowRightOnRectangle size={12} className="c-success" />
            <span className="ml-1">
              {new Date(startsOnTimestamp).toLocaleDateString()}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-1">
          <Image
            src="/icons/person-active.svg"
            alt="members"
            width={14}
            height={14}
          />
          <p className="">
            {totalMembers - slots} / {totalMembers}
          </p>
        </div>
      </div>
      <div className="flex flex-col justify-center items-end w-1/3 gap-1">
        <p className="text-lg font-bold">
          {amount} <span className="">{crypto}</span>
        </p>
        {status !== GroupStatus.ACTIVE && (
          <div className="flex items-center gap-1 text-sm">
            {/* <p className="text-accent-100">
              {getRelativeTime(startsOnTimestamp - Date.now())}
            </p> */}
          </div>
        )}
        <Link
          href={`/groups/${id}?myGroups=true`}
          passHref
          style={{ display: 'contents' }}
        >
          <Button
            label="View"
            type="outline-primary"
            onClick={() => handleViewDetails(id)}
            className="w-full style-accent-light hover-effect"
          />
        </Link>
      </div>
    </div>
  );
}
