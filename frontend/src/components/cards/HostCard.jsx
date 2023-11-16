import React, { useState } from 'react';
import ListingEdit from '../modals/ListingEditModal';
import AvailableModal from '../modals/AvailableModal';
import HostListCard from './HostListCard';

// a wrapper of host list card and modals
const HostCard = (props) => {
  const [published, setPublished] = useState(props.item.published);
  const [openEdit, setOpenEdit] = useState(false);
  const [openPublish, setOpenPublish] = useState(false);

  return (
    <>
      <HostListCard
        published={published}
        setPublished={setOpenPublish}
        setOpenEdit={setOpenEdit}
        setOpenPublish={setOpenPublish}
        item={props.item}
        getList={() => props.getList()}
      />

      <ListingEdit
        token={localStorage.getItem('token')}
        listingId={props.item.id}
        open={openEdit}
        setOpen={setOpenEdit}
        getList={props.getList}
      />

      <AvailableModal
        listingId={props.item.id}
        token={localStorage.getItem('token')}
        open={openPublish}
        setOpen={setOpenPublish}
        publish={openPublish}
        setPublished={setPublished}
      />
    </>
  );
}

export default HostCard;
