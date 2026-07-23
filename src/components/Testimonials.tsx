import React, { useState } from 'react';
import { Star, CheckCircle2, MessageSquarePlus, Filter, Heart } from 'lucide-react';
import { REVIEWS } from '../data/mockData';
import { Review } from '../types';

export const Testimonials: React.FC = () => {
  const [reviewsList, setReviewsList] = useState<Review[]>(REVIEWS);
  const [filterSpecies, setFilterSpecies] = useState<string>('all');
  const [showReviewModal, setShowReviewModal] = useState(false);

  // New review form state
  const [author, setAuthor] = useState('');
  const [petName, setPetName] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');

  const filteredReviews = filterSpecies === 'all'
    ? reviewsList
    : reviewsList.filter((r) => r.species === filterSpecies);

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author || !comment) return;

    const newRev: Review = {
      id: `rev-${Date.now()}`,
      author,
      petName: petName || 'My Pet',
      species: 'dog',
      rating,
      date: 'Just now',
      verified: true,
      title: title || 'Wonderful Cutout Pillow!',
      comment,
      image: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80',
    };

    setReviewsList([newRev, ...reviewsList]);
    setShowReviewModal(false);
    setAuthor('');
    setPetName('');
    setTitle('');
    setComment('');
  };

  return (
    <section className="py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-[#F5EFE6]/40">
      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#5C4033]">Real Pet Parent Reviews</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#3D2E2B]">
              Loved by Thousands of Pet Parents
            </h2>
            <p className="text-sm text-[#795548] max-w-xl">
              See what our community has to say about their custom cutout pillows, mugs, and memorial gifts.
            </p>
          </div>

          <button
            onClick={() => setShowReviewModal(true)}
            className="bg-[#5C4033] hover:bg-[#3D2E2B] text-white px-5 py-3 rounded-2xl font-bold text-xs plush-shadow flex items-center space-x-2 transition-all self-start md:self-auto"
          >
            <MessageSquarePlus className="w-4 h-4 text-[#E5C158]" />
            <span>Write a Review</span>
          </button>
        </div>

        {/* Filter Buttons */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2">
          {['all', 'dog', 'cat', 'bird', 'rabbit'].map((sp) => (
            <button
              key={sp}
              onClick={() => setFilterSpecies(sp)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all border ${
                filterSpecies === sp
                  ? 'bg-[#5C4033] text-white border-[#5C4033]'
                  : 'bg-white text-[#5C4033] border-[#E5D7C6] hover:bg-[#F5EFE6]'
              }`}
            >
              {sp === 'all' ? 'All Reviews' : `${sp} Owners`}
            </button>
          ))}
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-white p-6 rounded-3xl border border-[#E5D7C6] plush-shadow space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>

                  <span className="text-[11px] text-gray-400">{rev.date}</span>
                </div>

                <h3 className="font-extrabold text-base text-[#3D2E2B]">{rev.title}</h3>
                <p className="text-xs text-[#795548] leading-relaxed">{rev.comment}</p>
              </div>

              <div className="pt-4 border-t border-[#E5D7C6] flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {rev.image && (
                    <img
                      src={rev.image}
                      alt={rev.petName}
                      className="w-10 h-10 rounded-xl object-cover border border-[#E5D7C6]"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div>
                    <p className="font-bold text-xs text-[#3D2E2B] flex items-center space-x-1">
                      <span>{rev.author}</span>
                      {rev.verified && <CheckCircle2 className="w-3.5 h-3.5 text-[#87A96B]" />}
                    </p>
                    <p className="text-[11px] text-gray-500">Pet: {rev.petName}</p>
                  </div>
                </div>

                {rev.isMemorial && (
                  <span className="bg-[#C86D51]/10 text-[#C86D51] text-[10px] font-bold px-2.5 py-1 rounded-full flex items-center space-x-1">
                    <Heart className="w-3 h-3 fill-current" />
                    <span>Memorial</span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#FDFBF7] p-6 sm:p-8 rounded-3xl max-w-md w-full border border-[#E5D7C6] space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-[#E5D7C6] pb-3">
              <h3 className="font-extrabold text-lg text-[#3D2E2B]">Write Your Review</h3>
              <button onClick={() => setShowReviewModal(false)} className="text-gray-400 hover:text-black font-bold">
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[#5C4033] block mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="e.g. Siddharth M."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C4033] block mb-1">Pet's Name</label>
                <input
                  type="text"
                  value={petName}
                  onChange={(e) => setPetName(e.target.value)}
                  placeholder="e.g. Bruno, Milo"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C4033] block mb-1">Rating</label>
                <div className="flex space-x-2 text-[#D4AF37]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 focus:outline-none"
                    >
                      <Star className={`w-6 h-6 ${star <= rating ? 'fill-current' : 'text-gray-300'}`} />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C4033] block mb-1">Review Title</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Absolutely loved it!"
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-[#5C4033] block mb-1">Your Experience *</label>
                <textarea
                  required
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Tell us about your pet pillow..."
                  className="w-full px-4 py-2.5 rounded-xl border border-[#E5D7C6] text-sm focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#5C4033] hover:bg-[#3D2E2B] text-white py-3 rounded-xl font-bold text-sm shadow-md transition-colors"
              >
                Submit Review
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};
