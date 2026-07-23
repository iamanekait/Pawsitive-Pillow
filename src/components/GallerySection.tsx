import React from 'react';
import { Camera, Heart, Instagram } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const galleryImages = [
    {
      img: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=800&q=80',
      caption: 'Golden Retriever Milo next to his 20-inch cutout pillow!',
      tag: '@pawsitivepillow',
    },
    {
      img: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?auto=format&fit=crop&w=800&q=80',
      caption: 'Frenchie Bruno hugging his exact cutout replica on couch',
      tag: '@pawsitivepillow',
    },
    {
      img: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&q=80',
      caption: 'Luna the tabby cat inspecting her mini cutout pillow!',
      tag: '@pawsitivepillow',
    },
    {
      img: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=800&q=80',
      caption: 'Forever in our hearts memorial pillow for Barnaby ❤️',
      tag: '@pawsitivepillow',
    },
    {
      img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&w=800&q=80',
      caption: 'Rabbit Oliver posing with his customized ear cutout pillow',
      tag: '@pawsitivepillow',
    },
    {
      img: 'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?auto=format&fit=crop&w=800&q=80',
      caption: 'Custom pet ceramic mug and pillow combo set',
      tag: '@pawsitivepillow',
    },
  ];

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center space-x-2 bg-[#F5EFE6] px-3.5 py-1.5 rounded-full text-xs font-bold text-[#5C4033] border border-[#E5D7C6]">
            <Camera className="w-3.5 h-3.5 text-[#C86D51]" />
            <span>Community Gallery</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2E2B]">
            Pets & Their Cutout Pillows
          </h2>
          <p className="text-sm text-[#795548]">
            Tag us <span className="font-bold text-[#C86D51]">@pawsitivepillow</span> on Instagram to be featured!
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {galleryImages.map((item, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-2xl overflow-hidden group border border-[#E5D7C6] plush-shadow"
            >
              <img
                src={item.img}
                alt={item.caption}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-end text-white text-[11px]">
                <p className="font-bold line-clamp-2">{item.caption}</p>
                <span className="text-[#E5C158] text-[10px] mt-1 font-semibold flex items-center space-x-1">
                  <Instagram className="w-3 h-3" />
                  <span>{item.tag}</span>
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
