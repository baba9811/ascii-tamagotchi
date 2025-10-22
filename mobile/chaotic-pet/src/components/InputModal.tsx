/**
 * InputModal Component
 * Generic modal for numeric input (e.g., Gamble amount, Loan amount)
 */

import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

interface InputModalProps {
  visible: boolean;
  title: string;
  description?: string;
  placeholder?: string;
  maxValue?: number;
  onConfirm: (value: number) => void;
  onClose: () => void;
}

export default function InputModal({
  visible,
  title,
  description,
  placeholder = 'Enter amount',
  maxValue,
  onConfirm,
  onClose,
}: InputModalProps) {
  const [inputValue, setInputValue] = useState('');

  const handleConfirm = () => {
    const numValue = parseInt(inputValue, 10);
    if (!isNaN(numValue) && numValue > 0) {
      if (maxValue && numValue > maxValue) {
        return; // Don't allow values exceeding max
      }
      onConfirm(numValue);
      setInputValue('');
      onClose();
    }
  };

  const handleClose = () => {
    setInputValue('');
    onClose();
  };

  const handleQuickAmount = (amount: number) => {
    setInputValue(amount.toString());
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          <Text style={styles.title}>{title}</Text>

          {description && (
            <Text style={styles.description}>{description}</Text>
          )}

          <TextInput
            style={styles.input}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder={placeholder}
            placeholderTextColor="#888"
            keyboardType="numeric"
            autoFocus
          />

          {maxValue && (
            <Text style={styles.maxText}>Max: ${maxValue}</Text>
          )}

          {/* Quick Amount Buttons */}
          <View style={styles.quickAmountsContainer}>
            <TouchableOpacity
              style={styles.quickButton}
              onPress={() => handleQuickAmount(10)}
            >
              <Text style={styles.quickButtonText}>$10</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickButton}
              onPress={() => handleQuickAmount(50)}
            >
              <Text style={styles.quickButtonText}>$50</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.quickButton}
              onPress={() => handleQuickAmount(100)}
            >
              <Text style={styles.quickButtonText}>$100</Text>
            </TouchableOpacity>
            {maxValue && (
              <TouchableOpacity
                style={styles.quickButton}
                onPress={() => handleQuickAmount(maxValue)}
              >
                <Text style={styles.quickButtonText}>MAX</Text>
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.buttonRow}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={handleClose}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.confirmButton}
              onPress={handleConfirm}
            >
              <Text style={styles.confirmText}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    backgroundColor: '#16213e',
    borderRadius: 15,
    padding: 20,
    width: '80%',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#00ff88',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#aaa',
    textAlign: 'center',
    marginBottom: 15,
  },
  input: {
    backgroundColor: '#0f3460',
    color: '#fff',
    fontSize: 18,
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    textAlign: 'center',
  },
  maxText: {
    color: '#ffaa00',
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 15,
  },
  quickAmountsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  quickButton: {
    backgroundColor: '#555',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  quickButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  cancelButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    marginRight: 10,
    alignItems: 'center',
  },
  cancelText: {
    color: '#fff',
    fontSize: 14,
  },
  confirmButton: {
    backgroundColor: '#e94560',
    padding: 12,
    borderRadius: 10,
    flex: 1,
    alignItems: 'center',
  },
  confirmText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});
