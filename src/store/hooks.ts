import { useDispatch, useSelector } from 'react-redux';
import { TypeAppDispatch, TypeRootState } from 'store';

export const useAppSelector = useSelector.withTypes<TypeRootState>();
export const useAppDispatch = useDispatch.withTypes<TypeAppDispatch>();
