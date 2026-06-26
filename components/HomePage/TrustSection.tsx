export default function TrustSection() {
  return (
    <div className="bg-[#EEF4FF] rounded-3xl p-6">
      <h3 className="text-xl font-semibold">Trust & Safety Guaranteed</h3>

      <div className="grid grid-cols-3 mt-6 text-center">
        <div>
          <p className="font-bold text-3xl">10k+</p>
          <p className="text-xs">Verified Workers</p>
        </div>

        <div>
          <p className="font-bold text-3xl">50k+</p>
          <p className="text-xs">Jobs Completed</p>
        </div>

        <div>
          <p className="font-bold text-3xl">100%</p>
          <p className="text-xs">Background Checked</p>
        </div>
      </div>
    </div>
  );
}
