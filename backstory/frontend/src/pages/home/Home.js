import React, { useState } from 'react';

import Collections from '../../components/collections/Collections';
import Gallery from '../../components/gallery/Gallery';
import Profile from '../../components/profile/Profile';
import Tabs from '../../components/tabs/Tabs';

function Home() {
  const [activeTab, setActiveTab] = useState("gallery");

  return (
    <div>
      <Profile profileImg={"https://media.gq.com/photos/5ba143d4fc6c6260e811638b/1:1/w_1333,h_1333,c_limit/Toad-Alternatives-GQ-2018-091818.jpg"} bio="Already for a mushroom!" name="Toad" />
      <Tabs setActiveTab={setActiveTab} />
      {activeTab === "gallery" ? <Gallery /> : <Collections />}
    </div>
  );
}

export default Home;
