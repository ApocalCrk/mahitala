import React from "react";
import ItemDiskusiTrending from "./SubComponents/ItemDiskusiTrending";

const DiskusiTrending = ({ popularDiscussions }) => {
  return (
    <div className="space-y-6">
      <div>
        <div>
          <h3 className="text-xl font-bold text-[#6C7D41] flex items-center gap-2 mb-4">
            Diskusi Populer
          </h3>
        </div>
        <div>
          <div className="space-y-4">
            {popularDiscussions.map((discussion, index) => (
              index <= 2 ? 
              <ItemDiskusiTrending
                key={discussion.id_diskusi}
                discussion={discussion}
              />
              : null
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiskusiTrending;
