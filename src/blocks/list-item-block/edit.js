/**
 * Import CSS.
 */
import './editor.scss';

/**
 * Import block dependencies.
 */
import { useBlockProps } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const ListItemBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( ListItemBlock, 'dlx-list-item-block' );

	const { attributes, setAttributes, isSelected, clientId } = props;
	const {
		uniqueId,
		textColor,
		backgroundColor,
	} = attributes;
	const blockProps = useBlockProps(
		{
			className: 'dlx-list-item-block',
		}
	);

	/**
	 * Generate Unique ID for the block instance.
	 */
	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );
			
	return (
		<li id={ uniqueId } { ...blockProps }>
			InnerBlocks go here.
		</li>
	);
};
export default ListItemBlock;