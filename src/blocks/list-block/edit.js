/**
 * Import CSS.
 */
import './editor.scss';

/**
 * Import block dependencies.
 */
import { useBlockProps, useInnerBlocksProps, InnerBlocks } from '@wordpress/block-editor';
import { useInstanceId } from '@wordpress/compose';
import { useEffect, useRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	ToolbarGroup,
	ToolbarDropdownMenu,
	MenuGroup,
	MenuItem,
} from '@wordpress/components';
import {
	BlockControls
} from '@wordpress/block-editor';

const ListBlock = ( props ) => {
	const generatedUniqueId = useInstanceId( ListBlock, 'dlx-list-block' );

	// Get the default prop shortcuts.
	const { attributes, setAttributes, isSelected, clientId } = props;

	// Set a reference to the innerBlocks.
	const innerBlocksRef = useRef( null );

	// Get child blocks reference.
	const childBlocks = wp.data.select( 'core/block-editor' ).getBlocks( clientId );

	// Extract out the attributes.
	const {
		uniqueId,
		listType,
	} = attributes;

	// Set block props.
	const blockProps = useBlockProps(
		{
			className: 'dlx-list-block',
		}
	);

	// Set InnerBlock props.
	const innerBlocksProps = useInnerBlocksProps(
		{
			className: 'dlx-list-block__inner',
			ref: innerBlocksRef,
		},
		{
			template: [
				[ 'dlxplugins/dlx-list-item-block' ],
				[ 'dlxplugins/dlx-list-item-block' ],
				[ 'dlxplugins/dlx-list-item-block' ],
			],
			allowedBlocks: [ 'dlxplugins/dlx-list-item-block' ],
			templateLock: false,
			renderAppender: InnerBlocks.DefaultBlockAppender
		}
	);

	/**
	 * Generate Unique ID for the block instance.
	 */
	useEffect( () => {
		setAttributes( { uniqueId: generatedUniqueId } );
	}, [] );

	/**
	 * Select the first paragraph block when first rendered.
	 */
	useEffect( () => {
		if ( innerBlocksRef && 'undefined' !== typeof innerBlocksRef.current && childBlocks.length > 0 ) {

			// Get child blocks of list item element.
			const listItemBlocks = wp.data.select( 'core/block-editor' ).getBlocksByClientId( clientId )[ 0 ].innerBlocks;

			// If child blocks are empty, bail.
			if ( ! listItemBlocks.length ) {
				return;
			}

			// Get the first list item.
			const firstItem = listItemBlocks[ 0 ];
			const firstItemClientId = firstItem.clientId;

			// Get the first child child block.
			const listItemBlock = wp.data.select( 'core/block-editor' ).getBlocksByClientId( firstItemClientId );
			const firstListItem = listItemBlock[ 0 ] ?? null;

			// Get the first child block's paragraph.
			const firstParagraph = firstListItem.innerBlocks[ 0 ] ?? [];
			if ( null === firstParagraph ) {
				return;
			}

			// Get the first child block's paragraph's client ID.
			const firstParagraphClientId = firstParagraph.clientId ?? null;
			if ( null === firstParagraphClientId ) {
				return;
			}
			
			// Select the first paragraph block via dispatch.
			wp.data.dispatch( 'core/block-editor' ).selectBlock( firstParagraphClientId );
		}
	}, [ innerBlocksRef, childBlocks ] );

	const blockToolbar = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarDropdownMenu
					icon="list-view"
					label={ __( 'List Type', 'dlx-list-block' ) }
				>
					{ ( { onClose } ) => (
						<>
							<MenuGroup className="dlx-list-block__list-type-group">
								<MenuItem
									icon={ 'ul' === listType ? 'yes' : null }
									isSelected={ 'ul' === listType }
									onClick={ () => {
										setAttributes( { listType: 'ul' } );
										onClose();
									} }
								>
									{ __( 'Unordered List', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ 'ol' === listType ? 'yes' : null }
									isSelected={ 'ol' === listType }
									onClick={ () => {
										setAttributes( { listType: 'ol' } );
										onClose();
									} }
								>
									{ __( 'Ordered List', 'photo-block' ) }
								</MenuItem>
								<MenuItem
									icon={ 'div' === listType ? 'yes' : null }
									isSelected={ 'div' === listType }
									onClick={ () => {
										setAttributes( { listType: 'div' } );
										onClose();
									} }
								>
									{ __( 'Block List', 'photo-block' ) }
								</MenuItem>
							</MenuGroup>
						</>
					) }
				</ToolbarDropdownMenu>
			</ToolbarGroup>
		</BlockControls>
	);
			
	return (
		<>
			{ blockToolbar }
			<section { ...blockProps }>
				<div id={ uniqueId } className="dlx-list-block__inner">
					<div className="dlx-list-block-title">
						{ __('DLX List Block', 'dlx-list-block' ) }
					</div>
					<ul>
						<div { ...innerBlocksProps } />
					</ul>
				</div>
			</section>
		</>
	);
};
export default ListBlock;