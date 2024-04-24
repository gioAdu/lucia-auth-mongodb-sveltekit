<script>
	import { TreeView, TreeViewItem } from '@skeletonlabs/skeleton';
</script>

<TreeView>
	<TreeViewItem>
		(item 1)
		<svelte:fragment slot="children">
			<TreeViewItem>
				(Child 1)
				<svelte:fragment slot="children">
					<TreeViewItem>(Child of Child 1)</TreeViewItem>
					<TreeViewItem>(Child of Child 2)</TreeViewItem>
				</svelte:fragment>
			</TreeViewItem>
			<TreeViewItem>(Child 2)</TreeViewItem>
		</svelte:fragment>
	</TreeViewItem>
	<TreeViewItem>(item 2)</TreeViewItem>
</TreeView>
