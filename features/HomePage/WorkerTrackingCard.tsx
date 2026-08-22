export default function WorkerTrackingCard() {
  return (
    <div className="bg-white border border-[#FF5404] rounded-3xl p-4">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <img
            src="https://i.pravatar.cc/80"
            className="w-12 h-12 rounded-full"
          />

          <div>
            <h3 className="font-bold">Rajesh M. is arriving</h3>

            <p className="text-[#FF5404] text-sm">ETA: 12 mins • Electrician</p>
          </div>
        </div>

        <button className="text-xl">✕</button>
      </div>

      <div className="mt-6 flex items-center justify-between text-sm">
        <span>Booked</span>
        <span className="text-[#FF5404] font-semibold">On the way</span>
        <span>Arrived</span>
      </div>
    </div>
  );
}
