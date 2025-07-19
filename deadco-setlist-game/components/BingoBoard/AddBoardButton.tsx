import React from 'react';
import { motion } from 'framer-motion';
import { SetlistStreetTheme } from '../../theme/SetlistStreetTheme';

interface AddBoardButtonProps {
  onAddBoard: () => void;
  disabled?: boolean;
  boardCount: number;
  maxBoards?: number;
}

export default function AddBoardButton({ 
  onAddBoard, 
  disabled = false, 
  boardCount,
  maxBoards = 5 
}: AddBoardButtonProps) {
  const canAddMore = boardCount < maxBoards;
  const isDisabled = disabled || !canAddMore;

  return (
    <motion.button
      onClick={onAddBoard}
      disabled={isDisabled}
      className={`
        relative group p-6 rounded-lg border-2 border-dashed transition-all duration-300 min-h-[200px] flex flex-col items-center justify-center gap-4
        ${isDisabled 
          ? 'cursor-not-allowed opacity-50' 
          : 'cursor-pointer hover:shadow-lg'
        }
      `}
      style={{
        backgroundColor: isDisabled 
          ? SetlistStreetTheme.colors.neutrals.lightGray 
          : SetlistStreetTheme.components.card.background,
        borderColor: isDisabled 
          ? SetlistStreetTheme.colors.neutrals.mediumGray 
          : SetlistStreetTheme.colors.accents.borderGray,
        color: isDisabled 
          ? SetlistStreetTheme.colors.neutrals.gray 
          : SetlistStreetTheme.components.text.heading.color,
      }}
      whileHover={!isDisabled ? { 
        scale: 1.02, 
        y: -2,
      } : {}}
      whileTap={!isDisabled ? { scale: 0.98 } : {}}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, type: "spring", bounce: 0.4 }}
    >
      {/* Plus Icon - Clean and Professional */}
      <motion.div
        className={`text-6xl font-bold transition-all duration-300`}
        style={{
          color: isDisabled 
            ? SetlistStreetTheme.colors.neutrals.gray 
            : SetlistStreetTheme.colors.primary.charcoal
        }}
      >
        {canAddMore ? '+' : '●'}
      </motion.div>

      {/* Text */}
      <div className="text-center">
        <h3 
          className="text-xl font-bold mb-2 transition-colors"
          style={{ 
            fontFamily: SetlistStreetTheme.fonts.primary,
            color: isDisabled 
              ? SetlistStreetTheme.colors.neutrals.gray 
              : SetlistStreetTheme.components.text.heading.color
          }}
        >
          {canAddMore ? 'Add Another Board' : 'Max Boards Reached'}
        </h3>
        
        <p 
          className="text-sm"
          style={{ 
            color: isDisabled 
              ? SetlistStreetTheme.colors.neutrals.gray 
              : SetlistStreetTheme.components.text.body.color
          }}
        >
          {canAddMore 
            ? `Create board ${boardCount + 1} of ${maxBoards}` 
            : `You have ${maxBoards} boards active`
          }
        </p>

        {canAddMore && (
          <div className="flex items-center justify-center gap-2 mt-3 text-xs">
            <span 
              style={{ color: SetlistStreetTheme.components.text.caption.color }}
            >
              Double your chances!
            </span>
          </div>
        )}
      </div>

      {/* Clean Professional Border Effect */}
      {!isDisabled && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-transparent pointer-events-none"
          style={{
            borderColor: SetlistStreetTheme.colors.primary.charcoal,
            opacity: 0,
          }}
          whileHover={{
            opacity: 0.2,
          }}
          transition={{
            duration: 0.2,
          }}
        />
      )}

      {/* Tooltip for disabled state */}
      {!canAddMore && (
        <motion.div
          className="absolute -top-2 left-1/2 transform -translate-x-1/2 px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap text-xs"
          style={{
            backgroundColor: SetlistStreetTheme.colors.neutrals.charcoal,
            color: SetlistStreetTheme.colors.neutrals.white,
          }}
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          Maximum {maxBoards} boards allowed
        </motion.div>
      )}
    </motion.button>
  );
} 