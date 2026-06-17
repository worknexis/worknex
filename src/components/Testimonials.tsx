import { Star } from 'lucide-react';
import { TESTIMONIALS } from '../data';

export default function Testimonials() {
  return (
    <section className="border-t border-gray-100 bg-gray-50/30 py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="font-mono text-xs font-bold uppercase tracking-widest text-indigo-600">
            Social Proof
          </h2>
          <p className="mt-2 font-sans text-2xl font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            Acclaimed by Remote Professionals
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-gray-500">
            Work Nexis helps thousands of developers, designers, and managers transition into full asynchronous workspaces. Here is their voice.
          </p>
        </div>

        <div className="mx-auto mt-12 grid max-w-lg grid-cols-1 gap-6 sm:max-w-none md:grid-cols-3">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl border border-gray-100 bg-white p-6 shadow-xs shadow-gray-100/40 relative overflow-hidden"
            >
              {/* Star header */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <blockquote className="text-xs leading-relaxed text-gray-600 italic">
                "{testimonial.quote}"
              </blockquote>

              <div className="mt-6 flex items-center gap-3 border-t border-gray-50 pt-4">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.author}
                  referrerPolicy="no-referrer"
                  className="h-9 w-9 rounded-full object-cover grayscale-[15%] border border-gray-100"
                />
                <div>
                  <h4 className="font-sans text-xs font-bold text-gray-900">
                    {testimonial.author}
                  </h4>
                  <p className="text-[10px] text-gray-500 font-medium">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
