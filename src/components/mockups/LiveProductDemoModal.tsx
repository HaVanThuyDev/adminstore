import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Button } from '../common/Button';
import { Product } from '../../types/product';
import { toast } from 'sonner';
import { 
  Play, 
  RefreshCw, 
  CheckCircle, 
  QrCode, 
  Calculator, 
  Send,
  Zap,
  Sparkles
} from 'lucide-react';

interface LiveProductDemoModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export const LiveProductDemoModal: React.FC<LiveProductDemoModalProps> = ({
  product,
  isOpen,
  onClose,
}) => {
  const [demoState, setDemoState] = useState<Record<string, any>>({});
  const [isRunning, setIsRunning] = useState(false);

  if (!product) return null;

  const handleSimulateAction = (actionName: string) => {
    setIsRunning(true);
    setTimeout(() => {
      setIsRunning(false);
      setDemoState((prev) => ({ ...prev, [actionName]: true }));
      toast.success(`MÃƒÂ´ phÃ¡Â»Âng thÃƒÂ nh cÃƒÂ´ng: ${actionName}`, {
        description: 'DÃ¡Â»Â¯ liÃ¡Â»â€¡u demo Ã„â€˜ÃƒÂ£ Ã„â€˜Ã†Â°Ã¡Â»Â£c tÃƒÂ­nh toÃƒÂ¡n vÃƒÂ  Ã„â€˜Ã¡Â»â€œng bÃ¡Â»â„¢ trÃƒÂªn giao diÃ¡Â»â€¡n.',
      });
    }, 700);
  };

  const renderInteractiveContent = () => {
    switch (product.mockupType) {
      case 'ecommerce':
        return (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Zap className="w-4 h-4 text-accent" /> MÃƒÂ´ phÃ¡Â»Âng Ã„â€˜Ã¡Â»â€œng bÃ¡Â»â„¢ tÃ¡Â»â€œn kho Ã„â€˜a kÃƒÂªnh
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                ThÃ¡Â»Â­ nghiÃ¡Â»â€¡m cÃ†Â¡ chÃ¡ÂºÂ¿ Ã„â€˜Ã¡Â»â€œng bÃ¡Â»â„¢ tÃ¡Â»Â©c thÃƒÂ¬ khi cÃƒÂ³ 1 Ã„â€˜Ã†Â¡n hÃƒÂ ng mÃ¡Â»â€ºi phÃƒÂ¡t sinh tÃ¡Â»Â« TikTok Shop.
              </p>

              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 text-xs">
                <span>TrÃ¡ÂºÂ¡ng thÃƒÂ¡i sÃƒÂ n: Shopee (150 SKU), TikTok (150 SKU)</span>
                <span className="font-mono text-emerald-400">
                  {demoState['sync_order'] ? 'Ã„ÂÃƒÂ£ Ã„â€˜Ã¡Â»â€œng bÃ¡Â»â„¢ -1 SKU' : 'SÃ¡ÂºÂµn sÃƒÂ ng'}
                </span>
              </div>

              <div className="mt-4">
                <Button
                  size="sm"
                  variant="primary"
                  isLoading={isRunning}
                  onClick={() => handleSimulateAction('sync_order')}
                  icon={<RefreshCw className="w-4 h-4" />}
                >
                  GiÃ¡ÂºÂ£ lÃ¡ÂºÂ­p phÃƒÂ¡t sinh Ã„â€˜Ã†Â¡n hÃƒÂ ng Shopee
                </Button>
              </div>
            </div>
          </div>
        );

      case 'residence':
        return (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <QrCode className="w-4 h-4 text-accent" /> MÃƒÂ´ phÃ¡Â»Âng sinh VietQR Ã„â€˜Ã¡Â»â„¢ng & gÃ¡ÂºÂ¡ch nÃ¡Â»Â£ tÃ¡Â»Â± Ã„â€˜Ã¡Â»â„¢ng
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                MÃƒÂ´ phÃ¡Â»Âng hÃƒÂ³a Ã„â€˜Ã†Â¡n phÃƒÂ­ dÃ¡Â»â€¹ch vÃ¡Â»Â¥ cÃ„Æ’n hÃ¡Â»â„¢ B12-05 vÃƒÂ  nhÃ¡ÂºÂ­n Webhook ngÃƒÂ¢n hÃƒÂ ng.
              </p>

              <div className="p-4 bg-white rounded-lg border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-900">CÃ„Æ’n hÃ¡Â»â„¢ B12-05 (ChÃ¡Â»Â§ hÃ¡Â»â„¢: TrÃ¡ÂºÂ§n VÃ„Æ’n Nam)</div>
                  <div className="text-slate-500">PhÃƒÂ­ quÃ¡ÂºÂ£n lÃƒÂ½ thÃƒÂ¡ng 03/2026: 1,450,000 Ã„â€˜</div>
                  <div className="text-emerald-400 mt-1">
                    {demoState['pay_bill'] ? 'Ã¢Å“â€œ Ã„ÂÃƒÆ’ Ã„ÂÃ¡Â»ÂI SOÃƒÂT & GÃ¡ÂºÂ CH NÃ¡Â»Â¢ QUA WEBHOOK' : 'Ã¢â‚¬Â¢ Ã„Âang chÃ¡Â»Â thanh toÃƒÂ¡n'}
                  </div>
                </div>
                <div className="w-16 h-16 bg-slate-100 rounded flex items-center justify-center border border-slate-300">
                  <QrCode className="w-10 h-10 text-accent" />
                </div>
              </div>

              <div className="mt-4">
                <Button
                  size="sm"
                  variant="accent"
                  isLoading={isRunning}
                  onClick={() => handleSimulateAction('pay_bill')}
                  icon={<CheckCircle className="w-4 h-4" />}
                >
                  MÃƒÂ´ phÃ¡Â»Âng cÃ†Â° dÃƒÂ¢n quÃƒÂ©t mÃƒÂ£ VietQR thÃƒÂ nh cÃƒÂ´ng
                </Button>
              </div>
            </div>
          </div>
        );

      case 'hrm':
        return (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-cyan-400" /> MÃƒÂ´ phÃ¡Â»Âng chÃ¡ÂºÂ¥m cÃƒÂ´ng FaceID & tÃ¡Â»Â± Ã„â€˜Ã¡Â»â„¢ng tÃƒÂ­nh lÃ†Â°Ã†Â¡ng
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                KiÃ¡Â»Æ’m tra logic tÃƒÂ­nh cÃƒÂ´ng chuÃ¡ÂºÂ©n xÃƒÂ¡c kÃƒÂ¨m phÃ¡Â»Â¥ cÃ¡ÂºÂ¥p vÃƒÂ  giÃ¡ÂºÂ£m trÃ¡Â»Â« gia cÃ¡ÂºÂ£nh.
              </p>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">NhÃƒÂ¢n viÃƒÂªn: NguyÃ¡Â»â€¦n ThÃ¡Â»â€¹ ÃƒÂnh (KhÃ¡Â»â€˜i KÃ¡Â»Â¹ thuÃ¡ÂºÂ­t)</span>
                  <span className="text-emerald-400">CÃƒÂ´ng: 22/22 NgÃƒÂ y</span>
                </div>
                <div className="flex justify-between font-mono font-bold text-slate-900 pt-1 border-t border-slate-200">
                  <span>LÃ†Â°Ã†Â¡ng thÃ¡Â»Â±c nhÃ¡ÂºÂ­n (Net):</span>
                  <span className="text-cyan-400">24,850,000 Ã„â€˜</span>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  size="sm"
                  variant="primary"
                  isLoading={isRunning}
                  onClick={() => handleSimulateAction('calc_salary')}
                  icon={<Play className="w-4 h-4" />}
                >
                  TÃ¡ÂºÂ¡o vÃƒÂ  gÃ¡Â»Â­i phiÃ¡ÂºÂ¿u lÃ†Â°Ã†Â¡ng bÃ¡ÂºÂ£o mÃ¡ÂºÂ­t qua email
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="space-y-4">
            <div className="bg-white border border-slate-200 p-4 rounded-xl">
              <h4 className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary-light" /> TrÃ¡ÂºÂ£i nghiÃ¡Â»â€¡m mÃƒÂ´i trÃ†Â°Ã¡Â»Âng Sandbox {product.name}
              </h4>
              <p className="text-xs text-slate-500 mb-4">
                HÃ¡Â»â€¡ thÃ¡Â»â€˜ng Ã„â€˜ang hoÃ¡ÂºÂ¡t Ã„â€˜Ã¡Â»â„¢ng trong mÃƒÂ´i trÃ†Â°Ã¡Â»Âng Demo trÃ¡Â»Â±c tiÃ¡ÂºÂ¿p trÃƒÂªn trÃƒÂ¬nh duyÃ¡Â»â€¡t. BÃ¡ÂºÂ¡n cÃƒÂ³ thÃ¡Â»Æ’ kiÃ¡Â»Æ’m tra luÃ¡Â»â€œng phÃƒÂ¢n quyÃ¡Â»Ân vÃƒÂ  xuÃ¡ÂºÂ¥t bÃƒÂ¡o cÃƒÂ¡o.
              </p>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs">
                <div className="text-slate-600">CÃƒÂ´ng nghÃ¡Â»â€¡ vÃ¡ÂºÂ­n hÃƒÂ nh: {product.techStack.join(' Ã¢â‚¬Â¢ ')}</div>
                <div className="text-emerald-400 font-mono mt-1">Ã¢Å“â€œ Ã„ÂÃƒÂ£ tÃ¡ÂºÂ£i dÃ¡Â»Â¯ liÃ¡Â»â€¡u mÃ¡ÂºÂ«u thÃƒÂ nh cÃƒÂ´ng</div>
              </div>

              <div className="mt-4 flex gap-2">
                <Button
                  size="sm"
                  variant="primary"
                  isLoading={isRunning}
                  onClick={() => handleSimulateAction('sandbox_run')}
                  icon={<Play className="w-4 h-4" />}
                >
                  ChÃ¡ÂºÂ¡y kÃ¡Â»â€¹ch bÃ¡ÂºÂ£n kiÃ¡Â»Æ’m thÃ¡Â»Â­ quy trÃƒÂ¬nh
                </Button>
              </div>
            </div>
          </div>
        );
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <span>TrÃ¡ÂºÂ£i nghiÃ¡Â»â€¡m Live Demo: {product.name}</span>
          <span className="text-xs bg-accent/15 text-accent border border-accent/30 px-2 py-0.5 rounded-full font-normal">
            Sandbox
          </span>
        </div>
      }
      subtitle="BÃ¡ÂºÂ£n demo tÃ†Â°Ã†Â¡ng tÃƒÂ¡c trÃ¡Â»Â±c tiÃ¡ÂºÂ¿p chÃ¡ÂºÂ¡y trÃƒÂªn frontend Ã„â€˜Ã¡Â»Æ’ khÃƒÂ¡ch hÃƒÂ ng trÃ¡ÂºÂ£i nghiÃ¡Â»â€¡m nghiÃ¡Â»â€¡p vÃ¡Â»Â¥."
      maxWidth="xl"
    >
      <div className="space-y-4">
        {renderInteractiveContent()}

        <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
          <span className="text-xs text-slate-500">
            CÃ¡ÂºÂ§n triÃ¡Â»Æ’n khai bÃ¡ÂºÂ£n Ã„â€˜Ã¡ÂºÂ§y Ã„â€˜Ã¡Â»Â§ vÃ¡Â»â€ºi database thÃ¡Â»Â±c tÃ¡ÂºÂ¿ cho doanh nghiÃ¡Â»â€¡p?
          </span>
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              onClose();
              window.location.href = '/contact';
            }}
          >
            Ã„ÂÃ„Æ’ng kÃƒÂ½ tÃ†Â° vÃ¡ÂºÂ¥n chuyÃƒÂªn sÃƒÂ¢u
          </Button>
        </div>
      </div>
    </Modal>
  );
};
