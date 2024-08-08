import Image from 'next/image';

export interface ListItemProps {
  content: string;
}

function ListItem({ content }: Readonly<ListItemProps>) {
  return (
    <li className="grid grid-cols-[21px_1fr] gap-4 w-full">
      <Image
        src="/images/icon-list.svg"
        alt=""
        width={21}
        height={21}
        aria-hidden={true}
        priority
        className="mt-[2px]"
      />
      <p className="text-body text-dark-navy">{content}</p>
    </li>
  );
}

export default ListItem;
